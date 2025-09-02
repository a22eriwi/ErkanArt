import { useTheme } from "../useTheme";
import { NavLink } from "react-router-dom";
import DarkIcon from "../assets/darkMode.svg?react";
import LightIcon from "../assets/lightMode.svg?react";
import KontoIcon from "../assets/konto.svg?react";
import SearchIcon from "../assets/searchIcon.svg?react";
import Logga from "../assets/logga.svg?react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
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

type HeaderProps = { onOpenLogin: () => void };

export default function Header({ onOpenLogin }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-gray-200 mb-6 lg:border-none border-b-1 border-gray-300 dark:border-gray-800">

      <div className="flex items-center justify-between lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5">
        <div className="flex lg:flex-1 items-center">
          <NavLink to="/" end>
            <Logga className="w-[130px] sm:w-[150px] xl:w-[180px]" />
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="hidden relative lg:flex xl:ml-2 h-8 w-16 sm:w-18 items-center rounded group">
            <span className={`absolute left-1 h-7 w-7 sm:h-8 sm:w-8 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-7 sm:translate-x-8" : "-translate-x-0 sm:-translate-x-0"}`} />
            <LightIcon className="absolute left-2  size-5 sm:size-6 group-hover:text-sky-800 dark:group-hover:text-white" />
            <DarkIcon className="absolute right-2 size-5 sm:size-6 group-hover:text-sky-800 dark:group-hover:text-white" />
          </button>
          <button className="mx-2">
            <SearchIcon className="size-6 hover:text-sky-800 dark:hover:text-white" />
          </button>

          <Menu as="div" className="relative inline-block">
            <MenuButton className="group inline-flex w-full justify-center gap-x-1.5 rounded-md outline-1 outline-gray-300 dark:outline-gray-800 px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5
            hover:outline-gray-400 dark:hover:outline-gray-700 hover:text-sky-800 dark:hover:text-white
            aria-expanded:text-sky-800
            dark:aria-expanded:text-white
            aria-expanded:outline-gray-400
            dark:aria-expanded:outline-gray-700"
            >
              <KontoIcon className="size-5" />
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 text-sm origin-top-right font-semibold text-sky-700 dark:text-gray-300 rounded-md bg-white dark:bg-gray-800 shadow-lg outline-1 outline-gray-300 dark:outline-gray-700
               -outline-offset-1 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 data-focus:bg-gray-100 dark:data-focus:bg-gray-700 data-focus:text-sky-950 dark:data-focus:text-white data-focus:outline-hidden"
                  >
                    Support
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 data-focus:bg-gray-100 dark:data-focus:bg-gray-700 data-focus:text-sky-950 dark:data-focus:text-white data-focus:outline-hidden"
                  >
                    License
                  </a>
                </MenuItem>
                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-left data-focus:bg-gray-100 dark:data-focus:bg-gray-700 data-focus:text-sky-950 dark:data-focus:text-white data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>

          <button onClick={onOpenLogin} className="mx-2">
            <KontoIcon className="size-5 hover:text-sky-700 dark:hover:text-white" />
          </button>
        </div>

        <div className="flex lg:hidden items-center">
          <button className="mx-2">
            <SearchIcon className="size-6 hover:text-sky-700 dark:hover:text-white" />
          </button>
          <button onClick={onOpenLogin} className="mx-2">
            <KontoIcon className="size-5 hover:text-sky-700 dark:hover:text-white" />
          </button>
          {/* Hamburger button */}
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="inline-flex justify-center rounded-md ml-2 hover:text-sky-700 dark:hover:text-white">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-7 sm:size-8" />
          </button>
        </div>
      </div>

      <nav aria-label="Global" className="hidden lg:flex items-center justify-center w-full py-3 lg:border-y-1 border-gray-300 dark:border-gray-800">
        {/* Big nav */}
        <PopoverGroup className="hidden lg:flex">
          <div className="lg:flex lg:gap-x-10">
            <NavLink
              to="/Paintings"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
                after:bg-sky-950 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Paintings
            </NavLink>
            <NavLink
              to="/Photography"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
               after:bg-sky-950 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Photography
            </NavLink>
            <NavLink
              to="/Artists"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
              after:bg-sky-950 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Artists
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
              after:bg-sky-950 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              About
            </NavLink>
          </div>
        </PopoverGroup>
      </nav>

      {/* Mobile menu open*/}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/40 data-[closed]:opacity-0" />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 z-50 w-5/6 sm:w-3/5 bg-gray-200 dark:bg-gray-900 dark:text-gray-200 p-6 overflow-y-auto h-screen transform transition-transform duration-400 ease-in-out data-[closed]:translate-x-full">
          <div className="flex items-center justify-between pb-4">
            <button onClick={() => setTheme(isDark ? "light" : "dark")} className=" relative lg:flex h-8 w-18 items-center rounded group">
              <div className="flex justify-center items-center">
                <span className={`absolute left-1 h-8 w-8 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-8" : "-translate-x-0"}`} />
                <LightIcon className="absolute left-2 size-6 group-hover:text-sky-700 dark:group-hover:text-white" />
                <DarkIcon className="absolute right-2 size-6 group-hover:text-sky-700 dark:group-hover:text-white" />
              </div>
            </button>
            {/* Close button */}
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 hover:text-sky-700 dark:hover:text-white">
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-2 py-6">
              <NavLink to="/Paintings" onClick={() => setMobileMenuOpen(false)} className="border-b-1 border-gray-300 dark:border-gray-800 -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:text-sky-700 hover:dark:text-white">
                Paintings
              </NavLink>
              <NavLink to="/Photography" onClick={() => setMobileMenuOpen(false)} className="border-b-1 border-gray-300 dark:border-gray-800 -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:text-sky-700 hover:dark:text-white">
                Photography
              </NavLink>
              <NavLink to="/Artists" onClick={() => setMobileMenuOpen(false)} className="border-b-1 border-gray-300 dark:border-gray-800 -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:text-sky-700 hover:dark:text-white">
                Artists
              </NavLink>
              <NavLink to="/About" onClick={() => setMobileMenuOpen(false)} className="border-b-1 border-gray-300 dark:border-gray-800 -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:text-sky-700 hover:dark:text-white">
                About
              </NavLink>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  )
}