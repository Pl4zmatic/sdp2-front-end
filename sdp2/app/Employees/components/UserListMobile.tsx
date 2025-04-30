import React from "react";
import type { User } from "@/types/user";

type Props = {
  users: User[];
  roles: Record<number, string>;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UserListMobile: React.FC<Props> = ({ users, roles, onEdit, onDelete }) => (
  <div className="mt-4 space-y-4 md:hidden">
    {users.length > 0 ? (
      users.map((user) => (
        <div key={`mobile-${user.ID || user.EMAIL}`} className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold">ID: {user.ID}</div>
            <div className="flex gap-2">
              <button
                className="text-red-500 hover:text-red-400"
                onClick={() => onEdit(user)}
              >
                ✏️
              </button>
              <button
                className="text-red-500 hover:text-red-400"
                onClick={() => onDelete(user)}
              >
                🗑️
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex">
              <div className="w-1/3 text-gray-400">Name:</div>
              <div>{user.LASTNAME}</div>
            </div>
            <div className="flex">
              <div className="w-1/3 text-gray-400">First Name:</div>
              <div>{user.FIRSTNAME}</div>
            </div>
            <div className="flex">
              <div className="w-1/3 text-gray-400">Role:</div>
              <div>{roles[Number(user.ROL) as keyof typeof roles]}</div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="p-4 text-center text-gray-400">No users found</div>
    )}
  </div>
);

export default UserListMobile; 