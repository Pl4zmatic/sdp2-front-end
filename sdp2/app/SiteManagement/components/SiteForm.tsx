"use client"

import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { X } from "lucide-react"
import type { Plant, CreatePlantBody } from "@/app/types/Plant"
import type { User } from "@/types/user"

interface PlantFormProps {
  onSubmit: (data: CreatePlantBody, id?: number) => Promise<void>
  onCancel: () => void
  initialData?: Plant | null
  verantwoordelijkes: User[]
}

export default function UserForm({ onSubmit, onCancel, initialData, verantwoordelijkes }: PlantFormProps) {
  const [formData, setFormData] = useState({
    NAME: "",
    STATUS: "",
    HEALTH: 0,
    STREET: "",
    NUMBER: "",
    POSTALCODE: "",
    CITY: "",
    CURRENTPRODUCTION: 0,
    EFFICIENCYRATE: 0,
    VERANTWOORDELIJKE: "",
  })

  useEffect(() => {
    if (initialData) {
      const [street = "", number = "", city = "", postalCode = ""] = initialData.ADDRESS.split(",").map((part) =>
        part.trim(),
      )

      setFormData({
        NAME: initialData.NAME,
        STATUS: initialData.STATUS,
        HEALTH: initialData.HEALTH,
        STREET: street,
        NUMBER: number,
        POSTALCODE: postalCode,
        CITY: city,
        CURRENTPRODUCTION: initialData.CURRENTPRODUCTION,
        EFFICIENCYRATE: initialData.EFFICIENCYRATE,
        VERANTWOORDELIJKE: initialData.VERANTWOORDELIJKE,
      })
    }
  }, [initialData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const combinedAddress = `${formData.STREET} ${formData.NUMBER}, ${formData.POSTALCODE} ${formData.CITY} `

    const submissionData: CreatePlantBody = {
      ...formData,
      ADDRESS: combinedAddress,
    }

    console.log("user:", submissionData.VERANTWOORDELIJKE)

    await onSubmit(submissionData, initialData?.ID)
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
      {/* Form Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">{initialData ? "Edit Plant" : "Add New Plant"}</h2>
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
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.NAME ?? ""}
              onChange={(e) => setFormData({ ...formData, NAME: e.target.value })}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Status <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.STATUS ?? ""}
              onChange={(e) => setFormData({ ...formData, STATUS: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Health <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
            value={formData.HEALTH ?? ""}
            onChange={(e) => setFormData({ ...formData, HEALTH: Number(e.target.value) })}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  value={formData.STREET ?? ""}
                  onChange={(e) => setFormData({ ...formData, STREET: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  value={formData.NUMBER ?? ""}
                  onChange={(e) => setFormData({ ...formData, NUMBER: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  value={formData.CITY ?? ""}
                  onChange={(e) => setFormData({ ...formData, CITY: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  value={formData.POSTALCODE ?? ""}
                  onChange={(e) => setFormData({ ...formData, POSTALCODE: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              CurrentProduction <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.CURRENTPRODUCTION ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  CURRENTPRODUCTION: Number(e.target.value),
                })
              }
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Efficiency rate {<span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400`}
              value={formData.EFFICIENCYRATE ?? ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  EFFICIENCYRATE: Number(e.target.value),
                })
              }}
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Verantwoordelijke <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.VERANTWOORDELIJKE ?? ""}
              onChange={(e) => setFormData({ ...formData, VERANTWOORDELIJKE: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select a responsible person</option>
              {verantwoordelijkes.map((ver) => {
                const fullName = `${ver.FIRSTNAME} ${ver.LASTNAME}`
                return (
                  <option key={ver.ID} value={fullName}>
                    {fullName}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700 mt-6">
          <button
            type="submit"
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            {initialData ? "Update Plant" : "Add Plant"}
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
