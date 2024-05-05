import React, { useState } from 'react';

export const MainProfile = () => {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className=" mx-auto flex justify-between items-center h-52 bg-slate-200">
        <div className=' w-full  flex justify-center items-center '>
        <div className="rounded-full bg-gray-800 h-32 w-32 flex justify-center items-center ">
            {/* Your profile avatar */}
        </div>
        </div>
        
        </div>
      </header>
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto flex justify-center">
          <button
            className={`mr-4 px-4 py-2 focus:outline-none ${
              activeTab === 'about' ? 'bg-gray-500 text-white' : 'text-gray-600'
            }`}
            onClick={() => handleTabChange('about')}
          >
            About
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${
              activeTab === 'photos' ? 'bg-gray-500 text-white' : 'text-gray-600'
            }`}
            onClick={() => handleTabChange('photos')}
          >
            Photos
          </button>
          {/* Add more navigation tabs as needed */}
        </div>
      </nav>
      <div className="container mx-auto py-8">
        {activeTab === 'about' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">About Me</h1>
            <p className="text-gray-700">
              Insert your about me content here...
            </p>
            {/* Add more content as needed */}
          </div>
        )}
        {activeTab === 'photos' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Photos</h1>
            {/* Display photos here */}
          </div>
        )}
        {/* Add more tab content as needed */}
      </div>
    </div>
  );
};

