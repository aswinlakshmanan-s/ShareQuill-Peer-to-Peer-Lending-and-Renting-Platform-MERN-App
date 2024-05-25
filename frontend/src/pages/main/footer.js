import React from "react";
export default function Mainfooter() {
  return (
    <footer className="bg-black-1000 shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 bg-black-1000">
          <div className="sm:flex sm:items-center sm:justify-between">
              <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img src="/media/logo.png" className="h-8" alt="Logo" />
              </a>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black-50 sm:mb-0 dark:text-gray-400">
                  <li>
                      <a href="#" className="hover:underline me-4 md:me-6">About</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                  </li>
                  <li>
                      <a href="/contact" className="hover:underline">Contact</a>
                  </li>
              </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 text-black-50" />
          <span className="block text-sm text-gray-500 sm:text-center text-black-50">© 2023 <a href="/" className="hover:underline">ShareQuill™</a>. All Rights Reserved.</span>
      </div>
  </footer>
  );
}