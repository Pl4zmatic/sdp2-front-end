"use client"

import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import type { User, CreateUserBody } from "@/types/user"
import { X, Eye, EyeOff, RefreshCw } from "lucide-react"

interface UserFormProps {
  onSubmit: (data: CreateUserBody, id?: number) => Promise<void>
  onCancel: () => void
  initialData?: User | null
}

export default function UserForm({ onSubmit, onCancel, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserBody>({
    LASTNAME: "",
    FIRSTNAME: "",
    EMAIL: "",
    ROL: 0,
    ADRES: "",
    BIRTHDATE: "",
    GSMNUMMER: "",
    PASSWORD: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isGeneratingPassword, setIsGeneratingPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const roles = {
    0: "Administrator",
    1: "Supervisor",
    2: "Technician",
    3: "Manager",
  }

  useEffect(() => {
    if (initialData) {
      setFormData({
        LASTNAME: initialData.LASTNAME,
        FIRSTNAME: initialData.FIRSTNAME,
        EMAIL: initialData.EMAIL,
        ROL: initialData.ROL,
        ADRES: initialData.ADRES || "",
        BIRTHDATE: initialData.BIRTHDATE || "",
        GSMNUMMER: initialData.GSMNUMMER || "",
        PASSWORD: "",
      })
    }
  }, [initialData])

  // Check if phone number is required based on role
  const isPhoneRequired = formData.ROL === 2 // 2 is Technician

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate phone number if role is Technician
    const errors: Record<string, string> = {}

    if (isPhoneRequired && !formData.GSMNUMMER) {
      errors.GSMNUMMER = "Phone number is required for Technicians"
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    await onSubmit(formData, initialData?.ID)
  }

  const generatePassword = () => {
    setIsGeneratingPassword(true)

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"
    const length = Math.floor(Math.random() * 5) + 8
    let password = ""

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setFormData({ ...formData, PASSWORD: password })
    setShowPassword(true)

    setTimeout(() => {
      setIsGeneratingPassword(false)
    }, 500)
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
      {/* Form Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">{initialData ? "Edit Employee" : "Add New Employee"}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.LASTNAME}
              onChange={(e) => setFormData({ ...formData, LASTNAME: e.target.value })}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.FIRSTNAME}
              onChange={(e) => setFormData({ ...formData, FIRSTNAME: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
            value={formData.EMAIL}
            onChange={(e) => setFormData({ ...formData, EMAIL: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.ADRES}
              onChange={(e) => setFormData({ ...formData, ADRES: e.target.value })}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Birth Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.BIRTHDATE}
              onChange={(e) => setFormData({ ...formData, BIRTHDATE: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Phone Number {isPhoneRequired && <span className="text-red-500">*</span>}
            </label>
            <input
              type="tel"
              className={`w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 ${
                formErrors.GSMNUMMER ? "border-2 border-red-500" : ""
              }`}
              value={formData.GSMNUMMER}
              onChange={(e) => {
                setFormData({ ...formData, GSMNUMMER: e.target.value })
                if (formErrors.GSMNUMMER) {
                  setFormErrors({ ...formErrors, GSMNUMMER: "" })
                }
              }}
              required={isPhoneRequired}
            />
            {formErrors.GSMNUMMER && <p className="text-red-500 text-xs mt-1">{formErrors.GSMNUMMER}</p>}
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.ROL}
              onChange={(e) => setFormData({ ...formData, ROL: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              {Object.entries(roles).map(([value, label]) => (
                <option key={`role-${value}`} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {initialData ? "New Password" : "Password"} {!initialData && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 pr-24"
              value={formData.PASSWORD}
              onChange={(e) => setFormData({ ...formData, PASSWORD: e.target.value })}
              required={!initialData}
              placeholder={initialData ? "Leave empty to keep current" : ""}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                type="button"
                onClick={generatePassword}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Generate password"
              >
                <RefreshCw size={18} className={isGeneratingPassword ? "animate-spin" : ""} />
              </button>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-400">Click the refresh icon to generate a secure password.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700 mt-6">
          <button
            type="submit"
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            {initialData ? "Update Employee" : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-zinc-100 dark:dark:bg-slate-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
