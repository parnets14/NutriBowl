"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export const useAdminAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AuthProvider")
  }
  return context
}

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("admin_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)

    // Simulate API call - replace with real authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@nutribowl.com" && password === "admin123") {
      const userData = {
        id: "1",
        email: email,
        role: "admin",
      }
      setUser(userData)
      // localStorage.setItem("admin_user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("admin_user")
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
