const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface ApiError {
  detail: string
  error?: string
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: ApiError,
  ) {
    super(message)
    this.name = "ApiClientError"
  }
}

/**
 * Main API client function for making authenticated requests
 */
export async function apiClient<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  }

  try {
    const response = await fetch(`${API_URL}/api/v1${endpoint}`, config)

    // Handle 204 No Content
    if (response.status === 204) {
      return null as T
    }

    const data = await response.json()

    if (!response.ok) {
      throw new ApiClientError(data.detail || "API request failed", response.status, data)
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error
    }

    // Network or other errors
    throw new ApiClientError(error instanceof Error ? error.message : "Network error", 0)
  }
}

/**
 * Upload file to backend
 */
export async function uploadFile(file: File, type: "image" | "audio" | "document"): Promise<{ url: string }> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", type)

  try {
    const response = await fetch(`${API_URL}/api/v1/upload`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new ApiClientError(error.detail || "Upload failed", response.status, error)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error
    }
    throw new ApiClientError(error instanceof Error ? error.message : "Upload failed", 0)
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(): Promise<{ access_token: string; refresh_token: string }> {
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null

  if (!refreshToken) {
    throw new ApiClientError("No refresh token available", 401)
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
      throw new ApiClientError("Token refresh failed", response.status)
    }

    const data = await response.json()

    // Update tokens in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
    }

    return data
  } catch (error) {
    // Clear tokens on refresh failure
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }
    throw error
  }
}

/**
 * API client with automatic token refresh on 401
 */
export async function apiClientWithRefresh<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    return await apiClient<T>(endpoint, options)
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 401) {
      // Try to refresh token
      try {
        await refreshAccessToken()
        // Retry the original request
        return await apiClient<T>(endpoint, options)
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login"
        }
        throw refreshError
      }
    }
    throw error
  }
}
