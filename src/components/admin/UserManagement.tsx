
import React, { useState } from 'react';

// This is a MOCK data structure. In a real app, this would come from your database.
const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@bizwaves.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-20 10:30 AM' },
  { id: 2, name: 'WarRoom Volunteer', email: 'volunteer.war@bizwaves.com', role: 'Volunteer', status: 'Active', lastLogin: '2024-07-20 09:15 AM' },
  { id: 3, name: 'Finance Head', email: 'head.finance@bizwaves.com', role: 'Event Head', status: 'Inactive', lastLogin: '2024-07-19 05:00 PM' },
];

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState(initialUsers);

    // This component is currently a UI MOCKUP to demonstrate functionality.
    // Full implementation would require a secure backend and database (like Supabase).
    // Functions for creating, editing, and deleting users would interact with the backend API.

    const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
        const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block";
        if (status === 'Active') return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>Active</span>;
        return <span className={`${baseClasses} bg-gray-500/20 text-gray-300`}>Inactive</span>;
    };
    
    return (
        <div className="mt-8">
             <h2 className="font-montserrat text-2xl font-bold text-white mb-6">User & Access Management</h2>
             <div className="bg-black/30 border border-cyan-500/20 rounded-lg shadow-lg">
                <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Manage Users</h3>
                    <button className="font-semibold text-sm bg-cyan-500 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-cyan-400">
                        + Create New User
                    </button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-cyan-300 uppercase bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">User</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Last Login</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{user.name}</div>
                                        <div className="text-xs text-gray-400">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                                    <td className="px-6 py-4">{user.lastLogin}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button className="text-cyan-400 hover:text-cyan-300">Edit</button>
                                            <button className="text-red-400 hover:text-red-300">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

export default UserManagement;
