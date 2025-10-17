import { apiClient } from "../api-client"

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  content: string
  excerpt: string
  author: string
  read_time: string
  published_at: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ArticleSummary {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  author: string
  read_time: string
  published_at: string
}

export interface ArticleListResponse {
  total: number
  items: ArticleSummary[]
}

export interface ArticleCreate {
  title: string
  category: string
  content: string
  excerpt: string
  author: string
  read_time: string
  is_published?: boolean
}

export interface ArticleUpdate {
  title?: string
  category?: string
  content?: string
  excerpt?: string
  author?: string
  read_time?: string
  is_published?: boolean
}

export const articlesApi = {
  /**
   * Get all articles with pagination
   */
  getAll: async (params?: {
    skip?: number
    limit?: number
    category?: string
    is_published?: boolean
  }): Promise<ArticleListResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString())
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString())
    if (params?.category) searchParams.append("category", params.category)
    if (params?.is_published !== undefined) searchParams.append("is_published", params.is_published.toString())

    return apiClient<ArticleListResponse>(`/articles?${searchParams.toString()}`)
  },

  /**
   * Get article by slug
   */
  getBySlug: async (slug: string): Promise<Article> => {
    return apiClient<Article>(`/articles/slug/${slug}`)
  },

  /**
   * Get articles by category
   */
  getByCategory: async (category: string, skip = 0, limit = 20): Promise<ArticleListResponse> => {
    return apiClient<ArticleListResponse>(`/articles/category/${category}?skip=${skip}&limit=${limit}`)
  },

  /**
   * Get related articles
   */
  getRelated: async (articleId: string, limit = 3): Promise<ArticleSummary[]> => {
    return apiClient<ArticleSummary[]>(`/articles/${articleId}/related?limit=${limit}`)
  },

  /**
   * Create article (admin only)
   */
  create: async (data: ArticleCreate): Promise<Article> => {
    return apiClient<Article>("/articles", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Update article (admin only)
   */
  update: async (id: string, data: ArticleUpdate): Promise<Article> => {
    return apiClient<Article>(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  /**
   * Delete article (admin only)
   */
  delete: async (id: string): Promise<void> => {
    return apiClient(`/articles/${id}`, {
      method: "DELETE",
    })
  },
}
