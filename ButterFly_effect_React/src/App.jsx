import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './SignIn';
import DashboardAdmin from './assets/admin/DashBoardAdmin';
import Profile from './Profile';
// import Users from './Users'; 
import AdminLayout from './assets/admin/AdminLayout';
import UsersList from './assets/admin/Users';
import UserForm from './assets/admin/UserForm';
import DashboardInstitution from './assets/institution/DashboardInstitution';
import InstitutionLayout from './assets/institution/InstitutionLayout';
import CounselorsList from './assets/institution/Counselor';
import CounselorForm from './assets/institution/CounselorForm';

function App() {
  return (
    <Router>
      <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
        <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>

        <Routes>
          <Route path="/login" element={<SignIn />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} /> {/* /admin */}
            <Route path="profile" element={<Profile />} /> {/* /admin/profile */}
            <Route path="users" element={<UsersList />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/edit/:id" element={<UserForm />} />
          </Route>
          <Route path="/institution" element={<InstitutionLayout />}>
             <Route index element={<DashboardInstitution />} /> {/* /institution */}
            <Route path="Counselor" element={<CounselorsList />} />
<Route path="counselors/create" element={<CounselorForm />} />
  <Route path="/institution/counselors/edit/:id" element={<CounselorForm />} />

          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
