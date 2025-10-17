const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface ApiError {
  detail: string
  error?: string
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiClientError"
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { requiresAuth = false, ...fetchOptions } = options

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  }

  // Add auth token if required
  if (requiresAuth) {
    const token = localStorage.getItem("access_token")
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`${API_URL}/api/v1${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    // Handle 401 - try to refresh token
    if (response.status === 401 && requiresAuth) {
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        // Retry the request with new token
        const token = localStorage.getItem("access_token")
        if (token) {
          headers["Authorization"] = `Bearer ${token}`
        }
        const retryResponse = await fetch(`${API_URL}/api/v1${endpoint}`, {
          ...fetchOptions,
          headers,
        })

        if (!retryResponse.ok) {
          const errorData = await retryResponse.json().catch(() => ({}))
          throw new ApiClientError(errorData.detail || "Request failed", retryResponse.status, errorData)
        }

        return retryResponse.json()
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiClientError(
        errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData,
      )
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error
    }
    throw new ApiClientError(error instanceof Error ? error.message : "Network error", 0)
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) {
    return false
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) {
      // Refresh token is invalid, clear tokens
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      return false
    }

    const data = await response.json()
    localStorage.setItem("access_token", data.access_token)
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token)
    }
    return true
  } catch (error) {
    console.error("Token refresh failed:", error)
    return false
  }
}

// API Client methods
export const apiClient = {
  // GET request
  get: <T>(endpoint: string, requiresAuth = false) =>\
    apiRequest<T>(endpoint, { method: 'GET', requiresAuth }),

  // POST request
  post: <T>(endpoint: string, data?: any, requiresAuth = false) =>
    apiRequest<T>(endpoint, {\
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  // PUT request
  put: <T>(endpoint: string, data?: any, requiresAuth = false) =>
    apiRequest<T>(endpoint, {\
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  // PATCH request
  patch: <T>(endpoint: string, data?: any, requiresAuth = false) =>
    apiRequest<T>(endpoint, {\
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  // DELETE request
  delete: <T>(endpoint: string, requiresAuth = false) =>\
    apiRequest<T>(endpoint, { method: 'DELETE', requiresAuth }),

  // Upload file
  upload: async <T>(endpoint: string, file: File, requiresAuth = true): Promise<T> => {\
    const formData = new FormData()
    formData.append('file', file)

    const headers: HeadersInit = {}
    if (requiresAuth) {\
      const token = localStorage.getItem('access_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    const response = await fetch(`${API_URL}/api/v1${endpoint}`, {\
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {\
      const errorData = await response.json().catch(() => ({}))
      throw new ApiClientError(
        errorData.detail || 'Upload failed',
        response.status,
        errorData
      )
    }

    return response.json()
  },
}

// Helper to check if user is authenticated
export function isAuthenticated(): boolean {\
  return !!localStorage.getItem('access_token')
}

// Helper to clear auth tokens
export function clearAuthTokens(): void {
  localStorage.removeItem('access_token')\
  localStorage.removeItem('refresh_token')\
}
