"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for exit animation
    }, duration)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [duration, onClose])

  return (
    <div
      data-cy="toast-success"
      className={`fixed bottom-4 right-4 max-w-md bg-gray-800 border ${
        type === "success" ? "border-green-500" : "border-red-500"
      } rounded-lg shadow-lg transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } z-50`}
    >
      <div className="p-4 flex items-start gap-3">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className="dark:text-white text-black">{message}</p>
        </div>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="h-1 bg-gray-700 rounded-b-lg overflow-hidden">
        <div
          className={`h-full ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
          style={{ width: `${progress}%`, transition: "width 100ms linear" }}
        ></div>
      </div>
    </div>
  )
}
