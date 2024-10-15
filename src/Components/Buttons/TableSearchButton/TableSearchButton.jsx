import React, { useState } from 'react'

const TableSearchButton = ({ filter, setFilter}) => {


  return (
    <div>
        <div class="p-3 h-[45px] w-[270px] border-2 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center ">
            <div class="flex items-center justify-center fill-neutral-600">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                >
                <path
                    d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                ></path>
                </svg>
            </div>
            
            <input
                type="text"
                value={ filter || '' }
                onChange={ (e) => setFilter(e.target.value) }
                placeholder="Search"
                className="outline-none text-[20px] bg-transparent w-full text-black font-normal px-4"
            />
        </div>
    </div>
  )
}

export default TableSearchButton