import { React, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header'

const Layout = () => {
  const [Sidebartoggle, setSidebartoggle] = useState(true); // Sidebar hidden by default

  return (
    <div className='h-screen w-screen md:w-screen bg-neutral-100 overflow-hidden flex flex-row '>
        {/* Sidebar should be shown or hidden based on the Sidebartoggle */}
        <Sidebar Sidebartoggle={Sidebartoggle} setSidebartoggle={setSidebartoggle} />
        <div className='w-screen md:w-screen flex flex-col flex-1'>
          <Header Sidebartoggle={Sidebartoggle} setSidebartoggle={setSidebartoggle} />
          <div className='flex-1 p-4 min-h-0 overflow-auto'>
            <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default Layout;
