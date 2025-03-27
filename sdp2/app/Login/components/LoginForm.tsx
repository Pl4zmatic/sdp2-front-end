"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // hier komt login logica
    console.log("Login attempt with:", email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <Input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-lightestNavy border-none text-white placeholder:text-gray-400 focus:ring-white focus:ring-2 focus:ring-offset-0 focus-visible:ring-white focus-visible:ring-offset-0"
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-lightestNavy border-none text-white placeholder:text-gray-400 pr-10 focus:ring-white focus:ring-2 focus:ring-offset-0 focus-visible:ring-white focus-visible:ring-offset-0"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex justify-end">
        <a href="#" className="text-sm text-gray-400 hover:text-delawareRed"> //forgot password link moet nog aangepast worden
          Forgot Password
        </a>
      </div>
      <Button type="submit" className="w-full bg-delawareRed hover:bg-delawareRedAccent text-white py-2 rounded">
        Login
      </Button>
    </form>
  )
}

