import { apiClient } from "../api-client"

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: "user" | "admin"
  is_active: boolean
  created_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  full_name: string
  phone?: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: User
}

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (): Promise<User> => {
    return apiClient<User>("/auth/me")
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await apiClient("/auth/logout", {
      method: "POST",
    })

    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiClient("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    })
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<void> => {
    await apiClient("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiClient("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({
        token,
        new_password: newPassword,
      }),
    })
  },
}
