import React from 'react';
import Layout from './Layout';
import './css/argon-dashboard.css';
import './css/argon-dashboard.min.css';
import './css/nucleo-icons.css';
import './css/nucleo-svg.css';
import './css/perfect-scrollbar.css';
import './css/tooltips.css';
import './js/plugins/Chart.bundle.min.js';
import './js/plugins/charts.min.js';
import './js/plugins/perfect-scrollbar.min.js';
import './js/plugins/argon-dashboard.js';
import './js/plugins/argon-dashboard.min.js';
import './js/plugins/carousel.js';
import './js/plugins/charts.js';
import './js/plugins/dropdown.js';
import './js/plugins/fixed-plugin.js';
import './js/plugins/nav-pills.js';
import './js/plugins/navbar-collapse.js';
import './js/plugins/navbar-sticky.js';
import './js/plugins/perfect-scrollbar.js';
import './js/plugins/sidenav-burger.js';
import './js/plugins/tooltips.js';
function App() {
  return (
    <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
      <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
      <Layout />
    </div>
  );
}

export default App;