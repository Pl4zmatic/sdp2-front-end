"use client"

import useSWR from "swr"
import { getAll } from "../../../api/index"
import { useState } from "react"
import SiteTable from "./SiteTable"
import SearchField from "@/components/ui/SearchField"

const SiteManagement = () => {
  const { data = [], error, isLoading } = useSWR("sites", () => getAll("sites"));
  const [searchTerm, setSearchTerm] = useState("");
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading plants: {error.message}</div>
if(!isLoading && data) return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">
        Plant <span className="text-red-500">Management</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <SearchField
          placeholder="Search"
          onSearch={setSearchTerm}
          className="w-full md:w-[300px]"
          customStyles={{
            input:
              "px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400",
            icon: "left-3 top-1/2 -translate-y-1/2 text-gray-400",
          }}
        />
        <button
          className="w-full md:w-auto bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Plant
        </button>
      </div>
      <SiteTable sites={...data}
      />
    </div>
  )
}

export default SiteManagement
