'use client';

import { useState } from 'react';

interface User {
    id: number;
    LASTNAME: string;
    FIRSTNAME: string;
    EMAIL: string;
    ROL: number;
    ADRES: string;
    BIRTHDATE: string;
    GSMNUMMER: string;
}

interface CreateUserBody {
    ADRES: string;
    BIRTHDATE: string;
    EMAIL: string;
    FIRSTNAME: string;
    GSMNUMMER: string;
    LASTNAME: string;
    PASSWORD: string;
    ROL: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1251, LASTNAME: 'Ceulers', FIRSTNAME: 'Joël', EMAIL: 'joel@example.com', ROL: 1, ADRES: '', BIRTHDATE: '', GSMNUMMER: '' },
    { id: 5189, LASTNAME: 'Van Den Bossche', FIRSTNAME: 'Pieter', EMAIL: 'pieter@example.com', ROL: 1, ADRES: '', BIRTHDATE: '', GSMNUMMER: '' },
    { id: 7243, LASTNAME: 'De Cock', FIRSTNAME: 'Floor', EMAIL: 'floor@example.com', ROL: 2, ADRES: '', BIRTHDATE: '', GSMNUMMER: '' },
    { id: 9358, LASTNAME: 'De Ceulenaar', FIRSTNAME: 'Anna', EMAIL: 'anna@example.com', ROL: 3, ADRES: '', BIRTHDATE: '', GSMNUMMER: '' },
    { id: 1238, LASTNAME: 'De Boeck', FIRSTNAME: 'Jan', EMAIL: 'jan@example.com', ROL: 4, ADRES: '', BIRTHDATE: '', GSMNUMMER: '' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CreateUserBody>({
    LASTNAME: '',
    FIRSTNAME: '',
    EMAIL: '',
    ROL: 1,
    ADRES: '',
    BIRTHDATE: '',
    GSMNUMMER: '',
    PASSWORD: '',
  });

  const roles = {
    1: 'Administrator',
    2: 'Manager',
    3: 'Supervisor',
    4: 'Technician'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create user
    setShowModal(false);
  };

  const filteredUsers = users.filter(user => 
    user.FIRSTNAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.LASTNAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roles[user.ROL as keyof typeof roles].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Employee <span className="text-red-500">Management</span>
      </h1>
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 pl-10 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Employee
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] p-4 bg-gray-900 font-medium">
          <div>ID</div>
          <div>NAME</div>
          <div>FIRST NAME</div>
          <div>ROLE</div>
          <div>EDIT</div>
        </div>
        {filteredUsers.map(user => (
          <div key={user.id} className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] p-4 border-b border-gray-700 last:border-0">
            <div>{user.id}</div>
            <div>{user.LASTNAME}</div>
            <div>{user.FIRSTNAME}</div>
            <div>{roles[user.ROL as keyof typeof roles]}</div>
            <div>
              <button className="text-red-500 hover:text-red-400">✏️</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-70 z-40" onClick={() => setShowModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[90vw] bg-gray-800 p-8 rounded-lg z-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-6">Add New Employee</h2>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.LASTNAME}
                onChange={(e) => setFormData({...formData, LASTNAME: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.FIRSTNAME}
                onChange={(e) => setFormData({...formData, FIRSTNAME: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.EMAIL}
                onChange={(e) => setFormData({...formData, EMAIL: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.ADRES}
                onChange={(e) => setFormData({...formData, ADRES: e.target.value})}
                required
              />
              <input
                type="date"
                placeholder="Birth Date"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.BIRTHDATE}
                onChange={(e) => setFormData({...formData, BIRTHDATE: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.GSMNUMMER}
                onChange={(e) => setFormData({...formData, GSMNUMMER: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                value={formData.PASSWORD}
                onChange={(e) => setFormData({...formData, PASSWORD: e.target.value})}
                required
              />
              <select
                value={formData.ROL}
                onChange={(e) => setFormData({...formData, ROL: Number(e.target.value)})}
                className="w-full px-4 py-3 bg-red-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                {Object.entries(roles).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 mt-6"
              >
                Add Employee
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;