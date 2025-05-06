"use client"

import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { X, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Plant, CreatePlantBody } from "@/app/types/Plant"
import { User } from "@/types/user"

interface PlantFormProps {
  onSubmit: (data: CreatePlantBody, id?: number) => Promise<void>
  onCancel: () => void
  initialData?: Plant | null
  verantwoordelijkes: User[],
}

export default function UserForm({ onSubmit, onCancel, initialData, verantwoordelijkes }: PlantFormProps) {
  const [formData, setFormData] = useState<CreatePlantBody>({
    NAME: "",
  STATUS: "",
  HEALTH: 0,
  ADDRESS: "",
  CURRENTPRODUCTION: 0,
  EFFICIENCYRATE: 0,
  VERANTWOORDELIJKE: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        NAME: initialData.NAME,
        STATUS: initialData.STATUS,
        HEALTH: initialData.HEALTH,
        ADDRESS: initialData.ADDRESS,
        CURRENTPRODUCTION: initialData.CURRENTPRODUCTION,
        EFFICIENCYRATE: initialData.EFFICIENCYRATE,
        VERANTWOORDELIJKE: initialData.VERANTWOORDELIJKE,
      })
    }
  }, [initialData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}
    await onSubmit(formData, initialData?.ID)
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
              value={formData.NAME}
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
              value={formData.STATUS}
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
            value={formData.HEALTH}
            onChange={(e) => setFormData({ ...formData, HEALTH: Number(e.target.value) })}
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
              value={formData.ADDRESS}
              onChange={(e) => setFormData({ ...formData, ADDRESS: e.target.value })}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              CurrentProduction <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              value={formData.CURRENTPRODUCTION}
              onChange={(e) => setFormData({ ...formData, CURRENTPRODUCTION: Number(e.target.value) })}
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
              value={formData.EFFICIENCYRATE}
              onChange={(e) => {
                setFormData({ ...formData, EFFICIENCYRATE: Number(e.target.value) })
              }}
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Verantwoordelijke <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.VERANTWOORDELIJKE}
              onChange={(e) => setFormData({ ...formData, VERANTWOORDELIJKE: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              {verantwoordelijkes.map((ver) => (
                <option key={ver.ID} value={ver.LASTNAME}>
                  {ver.FIRSTNAME + " " + ver.LASTNAME}
                </option>
              ))}
            </select>
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
