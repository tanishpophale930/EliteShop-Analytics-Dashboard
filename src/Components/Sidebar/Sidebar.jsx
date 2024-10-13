import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from './SideBarData';
import { useAuth0 } from "@auth0/auth0-react";


const linkClass =
	'flex items-center  gap-2 text-md mx-3 px-3 py-3 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-md '

export default function Sidebar({Sidebartoggle}){

    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

	return (
    <div className={`${Sidebartoggle ? "block" : "hidden"} lg:block w-60 flex flex-col bg-neutral-900  h-full`} >

        <div className='flex items-center mt-6 mb-2 gap-3 ml-4  '>
          <FcBullish size={24}/>
          <p className='text-white text-lg'> EliteShop </p>
        </div>


        <div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
		</div>

        <hr size="" width="" color="red"/> 

        <div>
          <div>
			{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
				<SidebarLink key={link.key} link={link} />
                ))}
          </div>
		  
		  

          <div className='flex items-center gap-2 mb-2 mx-3 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-md'>
			<HiOutlineLogout size={19} className='text-red-500 text-md' />
            {
				isAuthenticated? (
                    <button className='text-red-500 text-md hover:no-underline' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> LogOut </button>
                ) : (
                    <button className='text-red-500 text-md hover:no-underline' onClick={loginWithRedirect}>Login</button>
                )
			}
			
			
          </div>
        </div>
    </div>
  )
} 




function SidebarLink({link}){
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}