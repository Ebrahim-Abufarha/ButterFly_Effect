import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import FixedPlugin from './FixedPlugin';
import DashboardCards from './DashboardCards';
import SalesOverview from './SalesOverview';
import Carousel from './Carousel';
import SalesByCountry from './SalesByCountry';
import Categories from './Categories';

function App() {
  return (
    <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
      <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
      
      <Sidebar />
      
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <Header />
        
        <div className="w-full px-6 py-6 mx-auto">
          {/* Dashboard Cards Row */}
          <DashboardCards />
          
          {/* Sales Overview and Carousel Row */}
          <div className="flex flex-wrap mt-6 -mx-3">
            <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
              <SalesOverview />
            </div>
            <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
              <Carousel />
            </div>
          </div>
          
          {/* Sales by Country and Categories Row */}
          <div className="flex flex-wrap mt-6 -mx-3">
            <div className="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
              <SalesByCountry />
            </div>
            <div className="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
              <Categories />
            </div>
          </div>
          
          <Footer />
        </div>
      </main>
      
      <FixedPlugin />
    </div>
  );
}

export default App;