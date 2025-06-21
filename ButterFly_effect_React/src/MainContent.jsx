import React from 'react';


function MainContent() {
  return (
    <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3"></div>
 <div classNameName="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
  <div classNameName="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
    <div classNameName="flex-auto p-4">
      <div classNameName="flex flex-row -mx-3">
        <div classNameName="flex-none w-2/3 max-w-full px-3">
          <div>
            <p classNameName="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Today's Money</p>
            <h5 classNameName="mb-2 font-bold dark:text-white">$53,000</h5>
            <p classNameName="mb-0 dark:text-white dark:opacity-60">
              <span classNameName="text-sm font-bold leading-normal text-emerald-500">+55%</span>
              since yesterday
            </p>
          </div>
        </div>
        <div classNameName="px-3 text-right basis-1/3">
          <div classNameName="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
            <i classNameName="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>


  );
}

export default MainContent;