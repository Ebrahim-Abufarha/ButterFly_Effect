import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const CounselorsList = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
         const token = localStorage.getItem('token');
      console.log('Token in use:', token); // هل يظهر التوكن هنا؟

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
        const response = await axios.get('/api/usersinstitutoin');
        setCounselors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching counselors:', error);
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this counselor?')) {
      try {
        await axios.get('/sanctum/csrf-cookie');

        const csrfToken = getCookie('XSRF-TOKEN');
        if (csrfToken) {
          axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        await axios.delete(`/api/usersinstitutoin/${id}`);

        setCounselors(counselors.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting counselor:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading counselors...</div>;

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 rounded-t-4 flex justify-between items-center">
          <h6 className="mb-0">Counselors Management</h6>
          <a
            href="/institution/counselors/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Add New Counselor
          </a>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="items-center w-full mb-0 align-top border-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Name</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Email</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Phone</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Counselees</th>
                <th className="px-2 py-3 font-bold text-left border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {counselors.map(user => (
                <tr key={user.id}>
                  <td className="p-2 align-middle border-b whitespace-nowrap">{user.name}</td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">{user.email}</td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">{user.phone}</td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">
                    {user.counselees?.length || 0}
                  </td>
                  <td className="p-2 align-middle border-b whitespace-nowrap">
                    <div className="flex space-x-2">
                      <a
                        href={`/institution/counselors/edit/${user.id}`}
                        className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </a>
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

              {counselors.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No counselors found.
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

export default CounselorsList;
