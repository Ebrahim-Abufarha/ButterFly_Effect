import React from 'react';

function Profile() {
  return (
    <div className="m-0 font-sans antialiased font-normal dark:bg-slate-900 text-base leading-default bg-gray-50 text-slate-500">
      <div className="absolute bg-y-50 w-full top-0 bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg')] min-h-75">
        <span className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-60"></span>
      </div>

      <aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 xl:ml-6 max-w-64 ease-nav-brand z-990 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
        <div className="h-19">
          <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" sidenav-close></i>
          <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html" target="_blank" rel="noreferrer">
            <img src="../assets/img/logo-ct-dark.png" className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8" alt="main_logo" />
            <img src="../assets/img/logo-ct.png" className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
            <span className="ml-1 font-semibold transition-all duration-200 dark:text-white ease-nav-brand">Argon Dashboard 2</span>
          </a>
        </div>

        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
            {/* Sidebar menu items */}
            <li className="mt-0.5 w-full">
              <a className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors dark:text-white dark:opacity-80" href="../pages/dashboard.html">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className="relative top-0 leading-normal text-blue-500 ni ni-tv-2 text-sm"></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
              </a>
            </li>
            
            {/* Other menu items */}
            {/* ... */}
          </ul>
        </div>

        <div className="mx-4">
          <p className="invisible hidden text-gray-800 text-red-500 text-red-600 text-blue-500 dark:text-white dark:opacity-60 after:bg-gradient-to-tl after:from-zinc-800 after:to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 after:from-blue-700 after:to-cyan-500 after:from-orange-500 after:to-yellow-500 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-orange-600 after:from-slate-600 after:to-slate-300 text-emerald-500 text-cyan-500 text-slate-400"></p>
          <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" sidenav-card>
            <img className="w-1/2 mx-auto" src="../assets/img/illustrations/icon-documentation.svg" alt="sidebar illustrations" />
            <div className="flex-auto w-full p-4 pt-0 text-center">
              <div className="transition-all duration-200 ease-nav-brand">
                <h6 className="mb-0 dark:text-white text-slate-700">Need help?</h6>
                <p className="mb-0 font-semibold leading-tight dark:text-white dark:opacity-60 text-xs">Please check our docs</p>
              </div>
            </div>
          </div>
          <a href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/argon-dashboard/" target="_blank" rel="noreferrer" className="inline-block w-full px-8 py-2 mb-4 font-bold leading-normal text-center text-white capitalize transition-all ease-in rounded-lg shadow-md bg-slate-700 bg-150 text-xs hover:shadow-xs hover:-translate-y-px">Documentation</a>
          <a className="inline-block w-full px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85" href="https://www.creative-tim.com/product/argon-dashboard-pro-tailwind?ref=sidebarfree" target="_blank" rel="noreferrer">Upgrade to pro</a>
        </div>
      </aside>

      <div className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68">
        <nav className="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 -mt-56 text-white transition-all ease-in shadow-none duration-250 lg:flex-nowrap lg:justify-start" navbar-profile navbar-scroll="true">
          <div className="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">
            <nav>
              <ol className="flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li className="leading-normal text-sm">
                  <a className="opacity-50" href="javascript:;">Pages</a>
                </li>
                <li className="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']" aria-current="page">Profile</li>
              </ol>
              <h6 className="mb-2 ml-2 font-bold text-white capitalize dark:text-white">Profile</h6>
            </nav>

            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div className="flex items-center md:ml-auto md:pr-4">
                <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                  <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input type="text" className="pl-9 text-sm dark:bg-slate-850 dark:text-white focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow" placeholder="Type here..." />
                </div>
              </div>
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                <li className="flex items-center">
                  <a href="../pages/sign-in.html" className="block px-0 py-2 font-semibold text-white transition-all ease-in-out text-sm">
                    <i className="fa fa-user sm:mr-1" aria-hidden="true"></i>
                    <span className="hidden sm:inline">Sign In</span>
                  </a>
                </li>
                <li className="flex items-center pl-4 xl:hidden">
                  <a href="javascript:;" className="block p-0 text-white transition-all ease-in-out text-sm" sidenav-trigger>
                    <div className="w-4.5 overflow-hidden">
                      <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                      <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                      <i className="ease relative block h-0.5 rounded-sm bg-white transition-all"></i>
                    </div>
                  </a>
                </li>
                <li className="flex items-center px-4">
                  <a href="javascript:;" className="p-0 text-white transition-all ease-in-out text-sm">
                    <i fixed-plugin-button-nav className="cursor-pointer fa fa-cog" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="relative w-full mx-auto mt-60">
          <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-none w-auto max-w-full px-3">
                <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-19 w-19 rounded-xl">
                  <img src="../assets/img/team-1.jpg" alt="profile_image" className="w-full shadow-2xl rounded-xl" />
                </div>
              </div>
              <div className="flex-none w-auto max-w-full px-3 my-auto">
                <div className="h-full">
                  <h5 className="mb-1 dark:text-white">Sayo Kravits</h5>
                  <p className="mb-0 font-semibold leading-normal dark:text-white dark:opacity-60 text-sm">Public Relations</p>
                </div>
              </div>
              <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                <div className="relative right-0">
                  <ul className="relative flex flex-wrap p-1 list-none bg-gray-50 rounded-xl" nav-pills role="tablist">
                    <li className="z-30 flex-auto text-center">
                      <a className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg bg-inherit text-slate-700" nav-link active href="javascript:;" role="tab" aria-selected="true">
                        <i className="ni ni-app"></i>
                        <span className="ml-2">App</span>
                      </a>
                    </li>
                    <li className="z-30 flex-auto text-center">
                      <a className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg bg-inherit text-slate-700" nav-link href="javascript:;" role="tab" aria-selected="false">
                        <i className="ni ni-email-83"></i>
                        <span className="ml-2">Messages</span>
                      </a>
                    </li>
                    <li className="z-30 flex-auto text-center">
                      <a className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-colors ease-in-out border-0 rounded-lg bg-inherit text-slate-700" nav-link href="javascript:;" role="tab" aria-selected="false">
                        <i className="ni ni-settings-gear-65"></i>
                        <span className="ml-2">Settings</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-6 mx-auto">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                  <div className="flex items-center">
                    <p className="mb-0 dark:text-white/80">Edit Profile</p>
                    <button type="button" className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Settings</button>
                  </div>
                </div>
                <div className="flex-auto p-6">
                
                </div>
              </div>
            </div>

            <div className="w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <img className="w-full rounded-t-2xl" src="../assets/img/bg-profile.jpg" alt="profile cover image" />
                <div className="flex flex-wrap justify-center -mx-3">
                  <div className="w-4/12 max-w-full px-3 flex-0">
                    <div className="mb-6 -mt-6 lg:mb-0 lg:-mt-16">
                      <a href="javascript:;">
                        <img className="h-auto max-w-full border-2 border-white border-solid rounded-circle" src="../assets/img/team-2.jpg" alt="profile image" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
                  <div className="flex justify-between">
                    <button type="button" className="hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-cyan-500 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Connect</button>
                    <button type="button" className="block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-cyan-500 lg:hidden tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
                      <i className="ni ni-collection text-2.8"></i>
                    </button>
                    <button type="button" className="hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Message</button>
                    <button type="button" className="block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:hidden tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
                      <i className="ni ni-email-83 text-2.8"></i>
                    </button>
                  </div>
                </div>

                <div className="flex-auto p-6 pt-0">
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 flex-1-0">
                      <div className="flex justify-center">
                        <div className="grid text-center">
                          <span className="font-bold dark:text-white text-lg">22</span>
                          <span className="leading-normal dark:text-white text-sm opacity-80">Friends</span>
                        </div>
                        <div className="grid mx-6 text-center">
                          <span className="font-bold dark:text-white text-lg">10</span>
                          <span className="leading-normal dark:text-white text-sm opacity-80">Photos</span>
                        </div>
                        <div className="grid text-center">
                          <span className="font-bold dark:text-white text-lg">89</span>
                          <span className="leading-normal dark:text-white text-sm opacity-80">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h5 className="dark:text-white">
                      Mark Davis
                      <span className="font-light">, 35</span>
                    </h5>
                    <div className="mb-2 font-semibold leading-relaxed text-base dark:text-white/80 text-slate-700">
                      <i className="mr-2 dark:text-white ni ni-pin-3"></i>
                      Bucharest, Romania
                    </div>
                    <div className="mt-6 mb-2 font-semibold leading-relaxed text-base dark:text-white/80 text-slate-700">
                      <i className="mr-2 dark:text-white ni ni-briefcase-24"></i>
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div className="dark:text-white/80">
                      <i className="mr-2 dark:text-white ni ni-hat-3"></i>
                      University of Computer Science
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;