import { useTheme } from "../useTheme";
import { NavLink } from "react-router-dom";
import DarkIcon from "../assets/darkMode.svg?react";
import LightIcon from "../assets/lightMode.svg?react";
import KontoIcon from "../assets/konto.svg?react";
import SearchIcon from "../assets/searchIcon.svg?react";
import Logga from "../assets/logga.svg?react";
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
'use client'

export default function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-gray-200 border-b-1 border-gray-300 dark:border-gray-800 mb-4">
      <nav aria-label="Global" className="flex items-center justify-between sm:px-6 xl:px-10 max-w-full px-4 pb-0">
        <div className="flex lg:flex-1 items-center">
          <NavLink to="/" end>
            <Logga className="w-[130px] sm:w-[150px] xl:w-[180px]" />
          </NavLink>
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="relative flex xl:ml-2 h-8 w-16 sm:w-18 items-center rounded group">
            <span className={`absolute left-1 h-7 w-7 sm:h-8 sm:w-8 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-7 sm:translate-x-8" : "-translate-x-0 sm:-translate-x-0"}`} />
            <LightIcon className="absolute left-2  size-5 sm:size-6 group-hover:text-sky-700 dark:group-hover:text-white" />
            <DarkIcon className="absolute right-2 size-5 sm:size-6 group-hover:text-sky-700 dark:group-hover:text-white" />
          </button>
        </div>
        <div className="flex lg:hidden items-center">
          <button className="mx-2">
            <SearchIcon className="size-6 hover:text-sky-700 dark:hover:text-white" />
          </button>
          <button className=" mx-2">
            <NavLink to="/Login"><KontoIcon className="size-5 hover:text-sky-700 dark:hover:text-white" /></NavLink>
          </button>

          {/* Hamburger button */}
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="inline-flex justify-center rounded-md ml-2 hover:text-sky-700 dark:hover:text-white">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-7 sm:size-8" />
          </button>
        </div>

        {/* Big nav */}
        <PopoverGroup className="hidden lg:flex">
          <div className="lg:flex lg:gap-x-10">
            <NavLink
              to="/Paintings"
              className={({ isActive }) =>
                `relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[29px] after:bottom-0 after:h-[2px]
                after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Paintings
            </NavLink>
            <NavLink
              to="/Photography"
              className={({ isActive }) =>
                `relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[29px] after:bottom-0 after:h-[2px]
               after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Photography
            </NavLink>
            <NavLink
              to="/Artists"
              className={({ isActive }) =>
                `relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[29px] after:bottom-0 after:h-[2px]
              after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Artists
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[29px] after:bottom-0 after:h-[2px]
              after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              About
            </NavLink>
          </div>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <button className="mx-2">
            <SearchIcon className="size-6 hover:text-sky-700 dark:hover:text-white" />
          </button>
          <button className=" mx-2">
            <NavLink to="/Login"><KontoIcon className="size-5 hover:text-sky-700 dark:hover:text-white" /></NavLink>
          </button>
        </div>
      </nav>

      {/* Mobile menu open*/}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/40 data-[closed]:opacity-0" />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 z-50 w-3/4 sm:w-1/2 bg-gray-200 dark:bg-gray-900 dark:text-gray-200 p-6 pt-9 sm:pt-9 overflow-y-auto h-screen transform transition-transform duration-400 ease-in-out data-[closed]:translate-x-full">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only"></span>
            </a>
            <div className="lg flex">
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 ml-1 rounded-md p-2.5 hover:text-sky-700 dark:hover:text-white">
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root text-center">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink to="/Paintings" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  Paintings
                </NavLink>
                <NavLink to="/Photography" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  Photography
                </NavLink>
                <NavLink to="/Artists" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  Artists
                </NavLink>
                <NavLink to="/About" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  About
                </NavLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  )
}