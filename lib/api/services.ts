import { apiClient } from "../api-client"

export interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ServiceListResponse {
  total: number
  items: Service[]
}

export interface ServiceCreate {
  name: string
  description: string
  duration: string
  price: number
  is_active?: boolean
}

export interface ServiceUpdate {
  name?: string
  description?: string
  duration?: string
  price?: number
  is_active?: boolean
}

export const servicesApi = {
  /**
   * Get all services
   */
  getAll: async (params?: {
    skip?: number
    limit?: number
    is_active?: boolean
  }): Promise<ServiceListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString())
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString())
    if (params?.is_active !== undefined) searchParams.append("is_active", params.is_active.toString())

    return apiClient<ServiceListResponse>(`/services?${searchParams.toString()}`)
  },

  /**
   * Get service by ID
   */
  getById: async (id: string): Promise<Service> => {
    return apiClient<Service>(`/services/${id}`)
  },

  /**
   * Create service (admin only)
   */
  create: async (data: ServiceCreate): Promise<Service> => {
    return apiClient<Service>("/services", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Update service (admin only)
   */
  update: async (id: string, data: ServiceUpdate): Promise<Service> => {
    return apiClient<Service>(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  /**
   * Delete service (admin only)
   */
  delete: async (id: string): Promise<void> => {
    return apiClient(`/services/${id}`, {
      method: "DELETE",
    })
  },
}
