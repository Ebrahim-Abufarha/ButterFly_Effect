import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        const institutionsOnly = response.data.filter(user => user.role === 'institution');
        setUsers(institutionsOnly);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this institution?')) {
      try {
        await axios.get('/sanctum/csrf-cookie');

        const csrfToken = getCookie('XSRF-TOKEN');
        if (csrfToken) {
          axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        await axios.delete(`/api/users/${id}`);

        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting institution:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading institutions...</div>;

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 rounded-t-4 flex justify-between items-center">
          <h6 className="mb-0">Institutions Management</h6>
          <Link
            to="/admin/users/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Add New Institution
          </Link>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="items-center w-full mb-0 align-top border-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Name</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Email</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Role</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="p-2 align-middle border-b whitespace-nowrap">{user.name}</td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">{user.email}</td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/users/edit/${user.id}`}
                        className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No institutions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
