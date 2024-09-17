// This is the main page that is entry page layout.
// By using outlet we got the functionality of automatic routing based on what we have provided in the routing
// For every page Sidebar and header will be common and only basd on the routing present in the navbar 
// Outlet will be automatically render that page based on what is provided in navbar routing except for those
// to which we have not appiled routing to include sidebar and navbar component like Login.

import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div className='bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row '>
        <Sidebar/>
        <div className='flex flex-col flex-1'>
          <Header/>
          <div className='flex-1 p-4 min-h-0 overflow-auto'>
            <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default Layout