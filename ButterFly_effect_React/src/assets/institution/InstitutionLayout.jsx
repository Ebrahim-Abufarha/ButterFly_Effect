// src/layouts/AdminLayout.jsx
import React from 'react';
import SidebaInstitutionr from '../institution/Sidebar';
import HeaderInstitution from '../institution/Header';
import FooterInstitution from '../institution/Footer';
import FixedPlugin from '../../FixedPlugin';
import { Outlet } from 'react-router-dom';

function InstitutionLayout() {
  return (
    <>
      <SidebaInstitutionr />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderInstitution />
        <div className="p-4">
          <Outlet /> 
        </div>
        <FooterInstitution />
      </main>
      <FixedPlugin />
    </>
  );
}

export default InstitutionLayout;
