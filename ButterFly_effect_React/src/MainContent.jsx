import React from 'react';
import DashboardCards from './DashboardCards';
import SalesChart from './SalesChart';
import Carousel from './Carousel';
import SalesTable from './SalesTable';
import Categories from './Categories';
import Footer from './Footer';

function MainContent() {
  return (
    <div className="w-full px-6 py-6 mx-auto">
      <DashboardCards />
      
      <div className="flex flex-wrap mt-6 -mx-3">
        <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
          <SalesChart />
        </div>
        <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
          <Carousel />
        </div>
      </div>

      <div className="flex flex-wrap mt-6 -mx-3">
        <div className="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
          <SalesTable />
        </div>
        <div className="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
          <Categories />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainContent;