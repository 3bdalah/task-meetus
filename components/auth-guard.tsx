"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { authApi } from "@/lib/api"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = false }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { token, isAuthenticated, login, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !isAuthenticated) {
        try {
          const userInfo = await authApi.getUserInfo(token)
          login(token, userInfo)
        } catch (error) {
          logout()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [token, isAuthenticated, login, logout])

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push("/")
      } else if (!requireAuth && isAuthenticated) {
        router.push("/dashboard")
      }
    }
  }, [isLoading, isAuthenticated, requireAuth, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
