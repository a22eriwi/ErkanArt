import { useTheme } from "../useTheme";
import DarkIcon from "../assets/darkMode.svg?react";
import LightIcon from "../assets/lightMode.svg?react";
import KontoIcon from "../assets/konto.svg?react";
import SearchIcon from "../assets/searchIcon.svg?react";
import Logga from "../assets/logga.svg?react";
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverGroup,
  PopoverPanel,
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
    <header>
      <nav aria-label="Global" className="flex items-center justify-between sm:px-8 max-w-full px-2 pb-0 pt-0">
        <div className="flex lg:flex-1">
          <a href="#">
            <Logga className="w-[130px] sm:w-[180px]" />
          </a>
        </div>
        <div className="flex lg:hidden items-center">
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="relative flex h-8 w-18 sm:mr-2 items-center rounded group">
            <span className={`absolute left-1 h-8 w-9 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-7.5" : "-translate-x-0.5"}`} />
            <LightIcon className="absolute left-2  h-6 w-6 group-hover:text-sky-700 dark:group-hover:text-white"/>
            <DarkIcon className="absolute right-2 h-6 w-6 group-hover:text-sky-700 dark:group-hover:text-white"/>
          </button>
          <button className=" mx-2">
            <KontoIcon className="size-5 hover:text-sky-700 dark:hover:text-white" />
          </button>
          <button className="mx-2">
            <SearchIcon className="size-6 hover:text-sky-700 dark:hover:text-white"/>
          </button>
          {/* Hamburger menu */}
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="inline-flex justify-center rounded-md mx-2 hover:text-sky-700 dark:hover:text-white">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-7 sm:size-8"/>
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex">
          <Popover className="relative">
            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl shadow-lg outline-1
              outline-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
            </PopoverPanel>
          </Popover>
          <div className="lg:flex lg:gap-x-10">
            <a href="#"
              className="relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[15px] after:bottom-0 after:h-[2px] after:w-0
              after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out hover:after:w-full">
              Paintings
            </a>
            <a href="#"
              className="relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[15px] after:bottom-0 after:h-[2px] after:w-0
              after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out hover:after:w-full">
              Photography
            </a>
            <a href="#"
              className="relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[15px] after:bottom-0 after:h-[2px] after:w-0
              after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out hover:after:w-full">
              Artists
            </a>
            <a href="#"
              className="relative text-base/6 font-semibold after:absolute after:left-0 after:translate-y-[15px] after:bottom-0 after:h-[2px] after:w-0
              after:bg-gray-900 dark:after:bg-gray-200 after:transition-all after:duration-250 after:ease-in-out hover:after:w-full">
              About
            </a>
          </div>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="relative flex mr-2 h-8 w-18 items-center rounded group">
            <span className={`absolute left-1 h-8 w-9 rounded-full inset-shadow-sm inset-shadow-indigo-400 duration-400 ease-in-out transform transition-transform ${isDark ? "translate-x-7.5" : "-translate-x-0.5"}`} />
            <LightIcon className="absolute left-2  size-6 group-hover:text-sky-700 dark:group-hover:text-white"/>
            <DarkIcon className="absolute right-2 size-6 group-hover:text-sky-700 dark:group-hover:text-white"/>
          </button>
          <button className=" mx-2">
            <KontoIcon className="size-5 hover:text-sky-700 dark:hover:text-white" />
          </button>
          <button className="mx-2">
            <SearchIcon className="size-6 hover:text-sky-700 dark:hover:text-white"/>
          </button>
        </div>
      </nav>
      {/* Menu open*/}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-100 data-[closed]:opacity-0" />
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
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  Paintings
                </a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  Photography
                </a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  Artists
                </a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-sky-700 hover:dark:text-white">
                  About
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}