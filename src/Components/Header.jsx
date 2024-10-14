import React, { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { RxHamburgerMenu } from "react-icons/rx";
import Login from './Login'
import classNames from 'classnames'
import LogOut from './LogOut';
import Notifications from './Buttons/Notifications/Notifications';
import SearchButton from './Buttons/SearchButton/SearchButton';
import MessagesButton from './Buttons/MessagesButton/MessagesButton';


const Header = ({Sidebartoggle, setSidebartoggle}) => {
  
  const navigate = useNavigate()

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="w-full bg-white h-16 px-4 flex border-b border-gray-200 justify-between">
			
			{/*  //Search Button Old
			<div className="relative">
				<HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
				<input
					type="text"
					placeholder="Search..."
					className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-md"
				/>
			</div>
			*/}


			<div className='flex gap-3 md:gap-4 items-center'>
                <div onClick={() => setSidebartoggle(!Sidebartoggle)} className='border-2 py-2 px-2 text-lg cursor-pointer rounded-full drop-shadow-3xl text-neutral-800 tracking-normal bg-slate-100 --tw-shadow-color: #f1f5f9; hover:bg-red-600 hover:text-white focus-outline-none'>
				    <RxHamburgerMenu fontSize={20}  onClick={() => setSidebartoggle(!Sidebartoggle)}/>
				</div>
				<SearchButton/>
			</div>

			<div className="flex items-center gap-3 md:mr-2">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ,
									'group inline-flex items-center rounded-sm p-1.5 hover:text-opacity-100 focus:outline-none '
								)}
							>
								<MessagesButton/>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">Messages</strong>
										<div className="mt-2 py-1 text-sm">No messages received.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>

				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ,
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none'
								)}
							>
								<Notifications/>
							</Popover.Button>	
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">Notifications</strong>
										<div className="mt-2 py-1 text-sm"> No notifications received.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				{isAuthenticated ? 	
				(<Menu as="div" className="relative">
					<div>
						<Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
							<span className="sr-only">Open user menu</span>
							<div
								className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
								style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid")' }}
							>
								<span className="sr-only">Marc Backes</span>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
					
					<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('/profile')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Your Profile
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('/settings')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Settings
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
									>
										Sign out
									</div>
								)}
							</Menu.Item>
					</Menu.Items> 
					</Transition>
				</Menu>) : (
					<button  className='border-2 py-1.5 md:py-1 px-2 md:px-3 ml-1 text-base md:text-lg rounded-md drop-shadow-3xl text-neutral-800 tracking-normal bg-slate-100 --tw-shadow-color: #f1f5f9; hover:bg-red-600 hover:text-white font-bold ' onClick={() => loginWithRedirect()}>Sign Up</button>
					)}

				
			</div>
		</div>
  )
}

export default Header