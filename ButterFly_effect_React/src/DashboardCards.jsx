import React from 'react';

function DashboardCards() {
  return (
    <div className="flex flex-wrap -mx-3">
      <DashboardCard 
        title="Today's Money" 
        value="$53,000" 
        change="+55%" 
        changeColor="emerald" 
        icon="ni ni-money-coins" 
        gradient="from-blue-500 to-violet-500"
        description="since yesterday"
      />
      <DashboardCard 
        title="Today's Users" 
        value="2,300" 
        change="+3%" 
        changeColor="emerald" 
        icon="ni ni-world" 
        gradient="from-red-600 to-orange-600"
        description="since last week"
      />
      <DashboardCard 
        title="New Clients" 
        value="+3,462" 
        change="-2%" 
        changeColor="red" 
        icon="ni ni-paper-diploma" 
        gradient="from-emerald-500 to-teal-400"
        description="since last quarter"
      />
      <DashboardCard 
        title="Sales" 
        value="$103,430" 
        change="+5%" 
        changeColor="emerald" 
        icon="ni ni-cart" 
        gradient="from-orange-500 to-yellow-500"
        description="than last month"
      />
    </div>
  );
}

function DashboardCard({ title, value, change, changeColor, icon, gradient, description }) {
  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">{title}</p>
                <h5 className="mb-2 font-bold dark:text-white">{value}</h5>
                <p className="mb-0 dark:text-white dark:opacity-60">
                  <span className={`text-sm font-bold leading-normal text-${changeColor}-500`}>{change}</span>
                  {description}
                </p>
              </div>
            </div>
            <div className="px-3 text-right basis-1/3">
              <div className={`inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ${gradient}`}>
                <i className={`ni leading-none ${icon} text-lg relative top-3.5 text-white`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;