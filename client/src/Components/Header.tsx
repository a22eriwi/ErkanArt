// client/src/Components/Header.tsx

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
import { useAuth } from "./authContext";
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
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-white mb-6 lg:border-none border-b-1 border-gray-300 dark:border-gray-800">

      <div className="flex items-center justify-between lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5">
        <div className="flex lg:flex-1 items-center">
          <NavLink to="/" end>
            <Logga className="w-[130px] sm:w-[150px] xl:w-[180px]" />
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="hidden relative lg:flex h-8 w-16 sm:w-18 items-center rounded">
            <span className={`absolute left-1 h-7 w-7 sm:h-8 sm:w-8 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-7 sm:translate-x-8" : "-translate-x-0 sm:-translate-x-0"}`} />
            <LightIcon className="absolute left-2  size-5 sm:size-6" />
            <DarkIcon className="absolute right-2 size-5 sm:size-6" />
          </button>
          <button className="mx-2">
            <SearchIcon className="size-6" />
          </button>

          {!isLoggedIn && (
            <button onClick={onOpenLogin} className="mx-2">
              <KontoIcon className="size-5" />
            </button>
          )}

          {isLoggedIn && (
            <Menu as="div" className="relative inline-block">
              <MenuButton className="group inline-flex w-full justify-center gap-x-1.5 rounded-md outline-1 outline-gray-300 dark:outline-gray-800 px-3 py-2 text-sm font-semibold dark:inset-ring-1 dark:inset-ring-white/5
            hover:outline-gray-400 dark:hover:outline-gray-600
            aria-expanded:outline-gray-400
            dark:aria-expanded:outline-gray-600"
              >
                <KontoIcon className="size-5" />
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-60 p-3 text-sm origin-top-right font-semibold rounded-xl bg-gray-100 dark:bg-gray-900 shadow-md outline-1 outline-gray-200 dark:outline-gray-800
       transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in inset-ring-1 dark:inset-ring-white/5 inset-ring-gray-200/20"
              >
                <div className="py-1">
                  <MenuItem>
                    <NavLink
                      to="/Profile"
                      className="rounded-md block px-2.5 py-2 data-focus:bg-gray-200 dark:data-focus:bg-gray-800 data-focus:outline-hidden"
                    >
                      Profile
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="rounded-md block w-full px-2.5 py-2 text-left data-focus:bg-gray-200 dark:data-focus:bg-gray-800 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>

        <div className="flex lg:hidden items-center">
          <button className="mx-2">
            <SearchIcon className="size-6" />
          </button>

          {/* Hamburger button */}
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="inline-flex justify-center rounded-md ml-2">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-7 sm:size-8" />
          </button>
        </div>
      </div>

      <nav aria-label="Global" className="hidden lg:flex items-center justify-center w-full py-3 lg:border-b-1 border-gray-300 dark:border-gray-800">
        {/* Big nav */}
        <PopoverGroup className="hidden lg:flex">
          <div className="lg:flex lg:gap-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
                after:bg-sky-950 dark:after:bg-white after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Home
            </NavLink>
            <NavLink
              to="/Paintings"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
                after:bg-sky-950 dark:after:bg-white after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Paintings
            </NavLink>
            <NavLink
              to="/Photography"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
               after:bg-sky-950 dark:after:bg-white after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Photography
            </NavLink>
            <NavLink
              to="/Artists"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
              after:bg-sky-950 dark:after:bg-white after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }>
              Artists
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `relative text-sm/6 font-semibold after:absolute after:left-0 after:translate-y-[13px] after:bottom-0 after:h-[2px]
              after:bg-sky-950 dark:after:bg-white after:transition-all after:duration-250 after:ease-in-out ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
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
          className="fixed inset-y-0 right-0 z-50 w-[280px] bg-gray-100 dark:bg-gray-900 dark:text-white text-sky-950 p-6 overflow-y-auto h-screen transform transition-transform duration-150 ease-in data-[closed]:translate-x-full 
          border-l-1 border-gray-400 dark:border-gray-700">
          <div className="flex items-center justify-between pb-4">
            <button onClick={() => setTheme(isDark ? "light" : "dark")} className=" relative lg:flex h-8 w-18 items-center rounded group">
              <div className="flex justify-center items-center">
                <span className={`absolute left-1 h-8 w-8 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-8" : "-translate-x-0"}`} />
                <LightIcon className="absolute left-2 size-6 " />
                <DarkIcon className="absolute right-2 size-6 " />
              </div>
            </button>
            {/* Close button */}
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5">
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-2 py-6 border-b-1 border-gray-300 dark:border-gray-800">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className=" -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md">
                Home
              </NavLink>
              <NavLink to="/Paintings" onClick={() => setMobileMenuOpen(false)} className=" -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md">
                Paintings
              </NavLink>
              <NavLink to="/Photography" onClick={() => setMobileMenuOpen(false)} className=" -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md">
                Photography
              </NavLink>
              <NavLink to="/Artists" onClick={() => setMobileMenuOpen(false)} className=" -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md">
                Artists
              </NavLink>
              <NavLink to="/About" onClick={() => setMobileMenuOpen(false)} className=" -mx-3 block px-3 py-2 text-sm/6 font-semibold hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md">
                About
              </NavLink>
            </div>
            <div className="-mx-3 space-y-2 py-6">
              {!isLoggedIn && (
                <button onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md">
                  <KontoIcon className="size-5" />
                  <span>Sign in</span>
                </button>
              )}
              {isLoggedIn && (
                <>
                  <NavLink to="/Profile" onClick={() => { setMobileMenuOpen(false) }} className="block px-3 py-2 text-sm/6 font-semibold hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md">
                    Profile
                  </NavLink>
                  <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md">
                    <KontoIcon className="size-5" />
                    <span>Sign out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  )
}