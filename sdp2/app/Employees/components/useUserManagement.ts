import { useState } from "react";
import useSWR, { mutate } from "swr";
import { getAll, save, deleteById } from "../../../api";
import type { User, CreateUserBody } from "@/types/user";

const roles = {
  0: "Administrator",
  1: "Supervisor",
  2: "Technician",
  3: "Manager",
};

const useUserManagement = () => {
  const { data: users = [], error, isLoading } = useSWR("users", () => getAll("users"));
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (formData: CreateUserBody, id?: number) => {
    try {
      await save("users", { arg: { id: id ?? null, ...formData } });
      setEditingUser(null);
      setShowModal(false);
      mutate("users");
      setToast({ show: true, message: `User ${id ? "updated" : "created"} successfully`, type: "success" });
    } catch (error) {
      console.error("Failed to save user:", error);
      setToast({ show: true, message: `Failed to ${id ? "update" : "create"} user`, type: "error" });
    }
  };

  const handleDeleteClick = (user: User) => {
    setDeleteUser(user);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    const userId = deleteUser?.ID;
    if (!userId) {
      setToast({ show: true, message: "Failed to delete user: No ID found", type: "error" });
      setShowDeleteConfirmation(false);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteById("users", { arg: userId });
      mutate("users");
      setToast({ show: true, message: "User deleted successfully", type: "success" });
    } catch (error) {
      setToast({ show: true, message: "Failed to delete user", type: "error" });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
      setDeleteUser(null);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  return {
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
    handleEdit,
    roles,
  };
};

export default useUserManagement; 