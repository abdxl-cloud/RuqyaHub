"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminAuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("admin_authenticated")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple demo authentication - in production, use proper backend authentication
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_authenticated", "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_authenticated")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
