import React from 'react';

function Footer() {
  return (
    <footer className="pt-4">
      <div className="w-full px-6 mx-auto">
        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
          <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
            <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
              ©
              {new Date().getFullYear()},
              made with <i className="fa fa-heart"></i> by
              <a href="https://www.creative-tim.com" className="font-semibold text-slate-700 dark:text-white" target="_blank" rel="noreferrer"> Creative Tim</a>
              for a better web.
            </div>
          </div>
          <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
            <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
              <FooterLink href="https://www.creative-tim.com" text="Creative Tim" />
              <FooterLink href="https://www.creative-tim.com/presentation" text="About Us" />
              <FooterLink href="https://creative-tim.com/blog" text="Blog" />
              <FooterLink href="https://www.creative-tim.com/license" text="License" last />
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text, last = false }) {
  return (
    <li className="nav-item">
      <a href={href} className={`block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500 ${last ? 'pr-0' : ''}`} target="_blank" rel="noreferrer">
        {text}
      </a>
    </li>
  );
}

export default Footer;