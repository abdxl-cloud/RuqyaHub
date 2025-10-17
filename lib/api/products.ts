import { apiClient } from "../api-client"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  category: string
  stock: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductListResponse {
  total: number
  items: Product[]
}

export interface ProductCreate {
  name: string
  description: string
  price: number
  image_url?: string
  category: string
  stock: number
  is_active?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string
  price?: number
  image_url?: string
  category?: string
  stock?: number
  is_active?: boolean
}

export const productsApi = {
  /**
   * Get all products
   */
  getAll: async (params?: {
    skip?: number
    limit?: number
    category?: string
    is_active?: boolean
  }): Promise<ProductListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString())
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString())
    if (params?.category) searchParams.append("category", params.category)
    if (params?.is_active !== undefined) searchParams.append("is_active", params.is_active.toString())

    return apiClient<ProductListResponse>(`/products?${searchParams.toString()}`)
  },

  /**
   * Get product by ID
   */
  getById: async (id: string): Promise<Product> => {
    return apiClient<Product>(`/products/${id}`)
  },

  /**
   * Create product (admin only)
   */
  create: async (data: ProductCreate): Promise<Product> => {
    return apiClient<Product>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Update product (admin only)
   */
  update: async (id: string, data: ProductUpdate): Promise<Product> => {
    return apiClient<Product>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  /**
   * Delete product (admin only)
   */
  delete: async (id: string): Promise<void> => {
    return apiClient(`/products/${id}`, {
      method: "DELETE",
    })
  },
}
