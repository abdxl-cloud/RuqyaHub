// Pagination
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  limit: number
}

// User
export interface User {
  id: string
  email: string
  full_name: string
  role: "user" | "admin"
  is_active: boolean
  created_at: string
}

// Auth
export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
}

// Article
export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author: string
  read_time: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface ArticleCreate {
  title: string
  content: string
  excerpt: string
  category: string
  author?: string
  read_time?: string
  published?: boolean
}

// Service
export interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: number
  is_active: boolean
  created_at: string
}

export interface ServiceCreate {
  name: string
  description: string
  duration: string
  price: number
  is_active?: boolean
}

// Product
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  is_active: boolean
  created_at: string
}

export interface ProductCreate {
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  is_active?: boolean
}

// Order
export interface OrderItem {
  product_id: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  shipping_address: string
  created_at: string
  updated_at: string
}

export interface OrderCreate {
  items: OrderItem[]
  shipping_address: string
  contact_email: string
  contact_name: string
}

// Appointment
export interface Appointment {
  id: string
  user_id: string
  service_id: string
  appointment_date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  created_at: string
}

export interface AppointmentCreate {
  service_id: string
  appointment_date: string
  contact_name: string
  contact_email: string
  contact_phone: string
  notes?: string
}

// Chat
export interface ChatMessage {
  id: string
  session_id: string
  sender: "user" | "admin"
  message: string
  timestamp: string
  read: boolean
}

export interface ChatSession {
  id: string
  user_name: string
  user_email: string
  status: "active" | "closed"
  created_at: string
  updated_at: string
}

// Podcast
export interface Podcast {
  id: string
  title: string
  description: string
  audio_url: string
  cover_image_url?: string
  duration: string
  published: boolean
  created_at: string
}

export interface PodcastCreate {
  title: string
  description: string
  audio_url: string
  cover_image_url?: string
  duration: string
  published?: boolean
}

// Audio
export interface Audio {
  id: string
  title: string
  description: string
  audio_url: string
  category: string
  duration: string
  published: boolean
  created_at: string
}

export interface AudioCreate {
  title: string
  description: string
  audio_url: string
  category: string
  duration: string
  published?: boolean
}

// Upload
export interface UploadResponse {
  url: string
  filename: string
}
