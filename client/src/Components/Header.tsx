import { useTheme } from "../useTheme";

'use client'

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

export default function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <nav aria-label="Global" className="flex items-center justify-between lg:px-8 max-w-full p-6 pb-0">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="loggaSmall.png"
              className="h-10 w-auto sm:hidden"
            />
            <img
              alt=""
              src="loggaBig.png"
              className="h-12 w-auto hidden sm:block"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex h-8 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
          >
            <span
              className={`absolute left-1 h-6 w-6 rounded-full  shadow-md transform transition-transform ${isDark ? "translate-x-6" : "translate-x-0"
                }`}
            />
            <span className="absolute left-2 text-xs">🌞</span>
            <span className="absolute right-2 text-xs">🌙</span>
          </button>
          {/* Hamburger menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 ml-1 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl shadow-lg outline-1 outline-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
            </PopoverPanel>
          </Popover>
          <a href="#" className="text-base/6 font-semibold">
            Art
          </a>
          <a href="#" className="text-base/6 font-semibold">
            Artists
          </a>
          <a href="#" className="text-base/6 font-semibold">
            About
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex h-8 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
          >
            <span
              className={`absolute left-1 h-6 w-6 rounded-full  shadow-md transform transition-transform ${isDark ? "translate-x-6" : "translate-x-0"
                }`}
            />
            <span className="absolute left-2 text-xs">🌞</span>
            <span className="absolute right-2 text-xs">🌙</span>
          </button>
          <a href="#" className="text-base/6 font-semibold ml-4">
            Log in
          </a>
        </div>
      </nav>
      {/* Menu open in small size */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:pt-9 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only"></span>
              <img
                alt="Logga"
                src="loggaSmall.png"
                className="h-10 w-auto sm:hidden"
              />
            </a>
            <div className="lg flex">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 ml-1 rounded-md p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
            </div>
          </div>
          <div className="mt-6 flow-root dark:text-white">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                >
                  Art
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                >
                  Artists
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                >
                  About
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}