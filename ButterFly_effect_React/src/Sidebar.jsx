import React from 'react';

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
      <div className="h-19">
        <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden" sidenav-close></i>
        <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700" href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html" target="_blank">
          <img src="./assets/img/logo-ct-dark.png" className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8" alt="main_logo" />
          <img src="./assets/img/logo-ct.png" className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Argon Dashboard 2</span>
        </a>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <SidebarItem 
            icon="ni ni-tv-2" 
            color="blue" 
            title="Dashboard" 
            active 
            href="./pages/dashboard.html"
          />
          <SidebarItem 
            icon="ni ni-calendar-grid-58" 
            color="orange" 
            title="Tables" 
            href="./pages/tables.html"
          />
          <SidebarItem 
            icon="ni ni-credit-card" 
            color="emerald" 
            title="Billing" 
            href="./pages/billing.html"
          />
          <SidebarItem 
            icon="ni ni-app" 
            color="cyan" 
            title="Virtual Reality" 
            href="./pages/virtual-reality.html"
          />
          <SidebarItem 
            icon="ni ni-world-2" 
            color="red" 
            title="RTL" 
            href="./pages/rtl.html"
          />
          
          <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase dark:text-white opacity-60">Account pages</h6>
          </li>
          
          <SidebarItem 
            icon="ni ni-single-02" 
            color="slate" 
            title="Profile" 
            href="./pages/profile.html"
          />
          <SidebarItem 
            icon="ni ni-single-copy-04" 
            color="orange" 
            title="Sign In" 
            href="./pages/sign-in.html"
          />
          <SidebarItem 
            icon="ni ni-collection" 
            color="cyan" 
            title="Sign Up" 
            href="./pages/sign-up.html"
          />
        </ul>
      </div>

      <SidebarHelpCard />
    </aside>
  );
}

function SidebarItem({ icon, color, title, href, active = false }) {
  return (
    <li className="mt-0.5 w-full">
      <a className={`${active ? 'bg-blue-500/13' : ''} dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`} href={href}>
        <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5`}>
          <i className={`relative top-0 text-sm leading-normal text-${color}-500 ${icon}`}></i>
        </div>
        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">{title}</span>
      </a>
    </li>
  );
}

function SidebarHelpCard() {
  return (
    <div className="mx-4">
      <p className="invisible hidden text-gray-800 text-red-500 text-red-600 text-blue-500 bg-gray-500/30 bg-cyan-500/30 bg-emerald-500/30 bg-orange-500/30 bg-red-500/30 after:bg-gradient-to-tl after:from-zinc-800 after:to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 after:from-blue-700 after:to-cyan-500 after:from-orange-500 after:to-yellow-500 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-orange-600 after:from-slate-600 after:to-slate-300 text-emerald-500 text-cyan-500 text-slate-400"></p>
      <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" sidenav-card>
        <img className="w-1/2 mx-auto" src="./assets/img/illustrations/icon-documentation.svg" alt="sidebar illustrations" />
        <div className="flex-auto w-full p-4 pt-0 text-center">
          <div className="transition-all duration-200 ease-nav-brand">
            <h6 className="mb-0 dark:text-white text-slate-700">Need help?</h6>
            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">Please check our docs</p>
          </div>
        </div>
      </div>
      <a href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/argon-dashboard/" target="_blank" className="inline-block w-full px-8 py-2 mb-4 text-xs font-bold leading-normal text-center text-white capitalize transition-all ease-in rounded-lg shadow-md bg-slate-700 bg-150 hover:shadow-xs hover:-translate-y-px">Documentation</a>
      <a className="inline-block w-full px-8 py-2 text-xs font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md select-none bg-150 bg-x-25 hover:shadow-xs hover:-translate-y-px" href="https://www.creative-tim.com/product/argon-dashboard-pro-tailwind?ref=sidebarfree" target="_blank">Upgrade to pro</a>
    </div>
  );
}

export default Sidebar;