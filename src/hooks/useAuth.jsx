"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("nutribowl_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login
    const mockUser = {
      id: "1",
      fullName: "John Doe",
      email: email,
      phone: "+1234567890",
      gender: "male",
      height: 175,
      weight: 70,
      heightUnit: "cm",
      weightUnit: "kg",
      foodPreference: "non-veg",
      bmi: 22.9,
      bmiCategory: "Normal weight",
    };

    setUser(mockUser);
    localStorage.setItem("nutribowl_user", JSON.stringify(mockUser));
  };

  const register = async (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
    };

    setUser(newUser);
    localStorage.setItem("nutribowl_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nutribowl_user");
  };

  const updateProfile = async (userData) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("nutribowl_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
