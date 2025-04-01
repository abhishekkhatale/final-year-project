"use client"

import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-black">WebRoom</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              How It Works
            </a>
            <a href="#reviews" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Reviews
            </a>
            <button className="ml-4 px-4 py-2 border border-black rounded-md text-sm font-medium text-black hover:bg-gray-50 transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 bg-black rounded-md text-sm font-medium text-white hover:bg-gray-800 transition-colors">
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-black focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <a
              href="#features"
              className="block py-2 text-base font-medium text-gray-700 hover:text-black"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-base font-medium text-gray-700 hover:text-black"
              onClick={toggleMenu}
            >
              How It Works
            </a>
            <a
              href="#reviews"
              className="block py-2 text-base font-medium text-gray-700 hover:text-black"
              onClick={toggleMenu}
            >
              Reviews
            </a>
            <div className="mt-4 flex flex-col space-y-2">
              <button className="w-full px-4 py-2 border border-black rounded-md text-base font-medium text-black hover:bg-gray-50 transition-colors">
                Log In
              </button>
              <button className="w-full px-4 py-2 bg-black rounded-md text-base font-medium text-white hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

