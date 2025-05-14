"use client"

import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import * as api from "../../api"

export const JWT_TOKEN_KEY = "token"
export interface AuthContextType {
  user: any
  loading: boolean
  isLoading: boolean
  error: any
  login: (credentials: any) => Promise<boolean>
  logout: () => void
  register: (data: any) => Promise<boolean>
  isAuthed: boolean
  ready: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem(JWT_TOKEN_KEY) : null
  )

  const { data: user, error: userError, isLoading, mutate: mutateUser } = useSWR(token ? "users/me" : null, api.getMe)
  const { trigger: doLogin, error: loginError, isMutating: loginLoading } = useSWRMutation("login", api.post)
  const { trigger: doRegister, error: registerError, isMutating: registerLoading } = useSWRMutation("register", api.post)

  const setSession = useCallback((token: string | null) => {
    setToken(token)
    if (token) {
      localStorage.setItem(JWT_TOKEN_KEY, token)
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY)
    }
  }, [])

  const login = useCallback(async (credentials: any) => {
    try {
      const { token } = await doLogin(credentials)
      setSession(token)
      mutateUser()
      return true
    } catch (err) {
      console.error("Login failed", err)
      return false
    }
  }, [doLogin, setSession, mutateUser])

  const register = useCallback(async (data: any) => {
    try {
      const { token } = await doRegister(data)
      setSession(token)
      mutateUser()
      return true
    } catch (err) {
      console.error("Registration failed", err)
      return false
    }
  }, [doRegister, setSession, mutateUser])

  const logout = useCallback(() => {
    setSession(null)
    mutateUser(null, false)
  }, [setSession, mutateUser])

  const value = useMemo(() => ({
    user,
    loading: loginLoading || registerLoading,
    isLoading,
    error: loginError || registerError || userError,
    login,
    logout,
    register,
    isAuthed: Boolean(token && user),
    ready: !isLoading && (Boolean(user) || (!token && !userError)),
  }), [user, loginLoading, registerLoading, isLoading, loginError, registerError, userError, login, logout, register, token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
