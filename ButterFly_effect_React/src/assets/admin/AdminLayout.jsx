// src/layouts/AdminLayout.jsx
import React from 'react';
import Sidebar from '../admin/Sidebar';
import Header from '../admin/Header';
import Footer from '../admin/Footer';
import FixedPlugin from '../../FixedPlugin';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
      <Sidebar />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <Header />
        <div className="p-4">
          <Outlet /> 
        </div>
        <Footer />
      </main>
      <FixedPlugin />
    </>
  );
}

export default AdminLayout;
