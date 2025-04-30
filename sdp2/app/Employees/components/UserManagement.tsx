"use client"

import { useState } from "react"
import DeleteConfirmation from "./DeleteConfirmation"
import Toast from "./ToastNotification"
import type { CreateUserBody } from "@/types/user"
import UserTable from "./UserTable"
import UserListMobile from "./UserListMobile"
import useUserManagement from "./useUserManagement"
import SearchField from "@/components/ui/SearchField"

const UserManagement = () => {
  const {
    users,
    error,
    isLoading,
    searchTerm,
    setSearchTerm,
    showModal,
    setShowModal,
    editingUser,
    setEditingUser,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    deleteUser,
    isDeleting,
    toast,
    setToast,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    roles,
    handleEdit,
  } = useUserManagement()

  const [addingNew, setAddingNew] = useState(false)

  const handleAddClick = () => {
    setEditingUser(null)
    setAddingNew(true)
  }

  const handleFormSubmit = async (data: CreateUserBody, id?: number) => {
    await handleSubmit(data, id)
    setAddingNew(false)
  }

  const handleCancelEdit = () => {
    setEditingUser(null)
    setAddingNew(false)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users: {error.message}</div>

  // Create the full name for highlighting
  const fullName = deleteUser ? `${deleteUser.FIRSTNAME} ${deleteUser.LASTNAME}` : ""

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">
        Employee <span className="text-red-500">Management</span>
      </h1>
      {/* Search & Add */}
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
          onClick={handleAddClick}
          className="w-full md:w-auto bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Employee
        </button>
      </div>
      <UserTable
        users={users}
        roles={roles}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        editingUser={editingUser}
        onFormSubmit={handleFormSubmit}
        onCancelEdit={handleCancelEdit}
        addingNew={addingNew}
      />
      <UserListMobile users={users} roles={roles} onEdit={handleEdit} onDelete={handleDeleteClick} />
      <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${fullName}? This action cannot be undone.`}
        highlightedText={fullName}
        isDeleting={isDeleting}
      />
      {toast?.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} duration={5000} />
      )}
    </div>
  )
}

export default UserManagement
