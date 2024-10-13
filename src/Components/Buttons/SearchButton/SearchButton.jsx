import React, { useState } from 'react';

const SearchButton = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Call the parent component's search function
  };

  return (
    <div>
      {/* Full Search Bar for Large Screens */}
      <div className="hidden lg:flex p-3 h-[35px] w-[270px] bg-slate-100 border-2 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full items-center">
        <div className="flex items-center justify-center fill-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5A7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search"
          className="outline-none text-md bg-transparent w-full text-neutral-800 px-4"
        />
      </div>

      {/* Search Icon for Small Screens */}
      <div className="lg:hidden p-1.5 bg-slate-100 border-2 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5A7.507,7.507,0,0,1,10.5,18Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchButton;
