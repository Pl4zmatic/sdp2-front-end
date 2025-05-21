import React from "react";
import type { User, CreateUserBody } from "@/types/user";
import UserForm from "./UserForm";

type Props = {
  users: User[];
  roles: Record<number, string>;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  editingUser: User | null;
  onFormSubmit: (data: CreateUserBody, id?: number) => Promise<void>;
  onCancelEdit: () => void;
  addingNew: boolean;
};

const UserTable: React.FC<Props> = ({ users, roles, onEdit, onDelete, editingUser, onFormSubmit, onCancelEdit, addingNew }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto hidden md:block">
    <div className="min-w-[600px]">
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_0.5fr] p-4 bg-gray-900 font-medium">
        <div>ID</div>
        <div>NAME</div>
        <div>FIRST NAME</div>
        <div>ROLE</div>
        <div>EDIT</div>
        <div>DELETE</div>
      </div>
      {users.length > 0 ? (
        users.map((user) => (
          <React.Fragment key={user.ID || user.EMAIL}>
            <div
              className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_0.5fr] p-4 border-b border-gray-700 last:border-0"
              data-cy="user-row"
            >
              <div>{user.ID}</div>
              <div>{user.LASTNAME}</div>
              <div>{user.FIRSTNAME}</div>
              <div>{roles[Number(user.ROL) as keyof typeof roles]}</div>
              <div>
                <button
                  className="text-red-500 hover:text-red-400"
                  onClick={() => onEdit(user)}
                  data-cy="edit-button"
                >
                  ✏️
                </button>
              </div>
              <div>
                <button
                  className="text-red-500 hover:text-red-400"
                  onClick={() => onDelete(user)}
                  data-cy="delete-button"
                >
                  🗑️
                </button>
              </div>
            </div>
            {editingUser?.ID === user.ID && (
              <div className="col-span-6 bg-gray-900 p-4 border-b border-gray-700">
                <UserForm
                  onSubmit={onFormSubmit}
                  onCancel={onCancelEdit}
                  initialData={editingUser}
                />
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div className="p-4 text-center text-gray-400 col-span-6">
          No users found
        </div>
      )}
      {addingNew && (
        <div className="col-span-6 bg-gray-900 p-4 border-b border-gray-700">
          <UserForm
            onSubmit={onFormSubmit}
            onCancel={onCancelEdit}
            initialData={undefined}
          />
        </div>
      )}
    </div>
  </div>
);

export default UserTable; 