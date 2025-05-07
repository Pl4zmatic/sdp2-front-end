"use client"

import useSWR from "swr"
import { getAll, save } from "../../../api/index"
import { useState, useMemo } from "react"
import SiteTable from "./SiteTable"
import FilterDropdown from "./FilterDropdown"
import SearchField from "@/components/ui/SearchField"
import { Plant } from "@/app/types/Plant"
import DeleteConfirmation from "./DeleteConfirmation"
import { deleteById } from "../../../api/index"
import { mutate } from "swr";

const SiteManagement = () => {
  const { data: data = [], error, isLoading } = useSWR("sites", () => getAll("sites"));
  const { data: verantwoordelijken, error: errorVerantwoordelijken, isLoading: isLoadingVerantwoordelijken } = useSWR("verantwoordelijken", () => getAll("verantwoordelijken"));
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState("")
  const [addingNew, setAddingNew] = useState(false)
  const [deletePlant, setDeletePlant] = useState<Plant | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);

  const handleAddClick = () => {
    setAddingNew(true)
  }

  const handleCancelEdit = () => {
    setAddingNew(false)
    setEditingPlant(null)
  }

  const handleEdit = (site: Plant) => {
      setEditingPlant(site);
    };

   const handleDeleteClick = (site: Plant) => {
      setShowDeleteConfirmation(true);
      setDeletePlant(site);
    };

  const handleDeleteConfirm = async () => {
    const siteId = deletePlant?.ID;
    if (!siteId) {
      setShowDeleteConfirmation(false);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteById("sites", { arg: siteId });
      mutate("sites");
    } catch (error) {
      console.log("fail")
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
      setDeletePlant(null);
    }
  };

  const handleSubmit = async (formData: any, id?: number) => {
    try {
      await save("sites", { arg: { id: id ?? null, ...formData } });
    } catch (error) {
      console.error("Failed to save plant:", error);
    }
  };

  const handleFormSubmit = async (data: any, id?: number) => {
      await handleSubmit(data, id)
      setAddingNew(false)
    }
  
  const filteredSites = useMemo(() => {
    if (position === "") return data;
    return data.filter((site: Plant) => 
      site.VERANTWOORDELIJKE?.toString() === position
    );
  }, [data, position]);

  if (isLoading || isLoadingVerantwoordelijken) return <div>Loading...</div>
  if (error || errorVerantwoordelijken) return <div>Error loading plants: {error.message}</div>

  function showForm(): void {
    throw new Error("Function not implemented.")
  }

  return (
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
      <FilterDropdown
          position={position}
          setPosition={setPosition}
          verantwoordelijken={verantwoordelijken}
        />
        <button
          className="w-full md:w-auto bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
          onClick={handleAddClick}
        >
          <span className="text-xl">+</span>
          Add Plant
        </button>
      </div>
      <SiteTable 
        sites={filteredSites} 
        addingNew={addingNew} 
        onFormSubmit={handleFormSubmit} 
        onCancelEdit={handleCancelEdit} 
        verantwoordelijkes={verantwoordelijken} 
        onDelete={handleDeleteClick}
        onEdit={handleEdit}
        editingPlant={editingPlant}
      />
      <DeleteConfirmation
              isOpen={showDeleteConfirmation}
              onClose={() => setShowDeleteConfirmation(false)}
              onConfirm={handleDeleteConfirm}
              title="Delete Plant"
              message={`Are you sure you want to delete ${deletePlant?.NAME}? This action cannot be undone.`}
              highlightedText={deletePlant?.NAME}
              isDeleting={isDeleting}
            />
    </div>
  )
}

export default SiteManagement
