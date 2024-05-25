import { useState } from 'react';
import {ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'

function Chatdrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="relative">
      {/* Your existing content goes here */}

      {/* Chat Bubble */}
      <div className="flex lg:ml-6">
        <a href="#" className="p-2 text-gray-400 hover:text-gray-500" onClick={toggleDrawer}>
          <span className="sr-only">Search</span>
          <ChatBubbleBottomCenterIcon className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={toggleDrawer}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-xs">
                {/* Drawer content goes here */}
                <div className="bg-white h-full p-4">
                  <p>Drawer Content</p>
                  {/* Add your additional content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatdrawer;