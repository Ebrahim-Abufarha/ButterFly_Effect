import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import FixedPlugin from './FixedPlugin';

function Layout() {
  return (
    <>
      <Sidebar />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <Header />
        <MainContent />
      </main>
      <FixedPlugin />
    </>
  );
}

export default Layout;