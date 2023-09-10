"use client"

import { useState, MouseEvent } from "react"
import clsx from "clsx"
import Image from "next/image"
import { useClickAway } from "@uidotdev/usehooks"
import { twMerge } from "tailwind-merge"

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownClasses = clsx({
    hidden: !isOpen,
    'absolute top-10 right-0': true
  })

  const dropdownRef = useClickAway<HTMLDivElement>((e) => {
    const element = e.target as HTMLElement

    if (element && element.id === 'use-avatar') return
  
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex items-center relative">
      <button
        type="button"
        
        className="flex mr-3 text-sm bg-gray-800 rounded-full overflow-hidden md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        onClick={toggleDropdown}
      >
        <Image
          width={35}
          height={35}
          id="use-avatar"
          src="/assets/profile-picture-3.jpg"
          alt='user image'
        />
      </button>
      <div
        ref={dropdownRef}
        className={twMerge('z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600', dropdownClasses)}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
  </div>
  )
}
