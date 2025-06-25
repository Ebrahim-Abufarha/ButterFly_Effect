import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import FixedPlugin from './FixedPlugin';
import DashboardAdmin from './DashBoardAdmin';
import SignIn from './SignIn';

function App() {
  return (
    <Router>
      <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
        <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>

        <Routes>
          <Route path="/login" element={<SignIn />} />

          <Route
            path="/admin"
            element={
              <>
                <Sidebar />
                <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
                  <Header />
                  <DashboardAdmin />
                  <Footer />
                </main>
                <FixedPlugin />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
