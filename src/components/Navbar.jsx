import React from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaMoon, FaSun, FaBars } from 'react-icons/fa'

const Navbar = ({ darkMode, toggleTheme, onAddClick, onMenuClick }) => {
  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mr-1"
              aria-label="Menu"
            >
              <FaBars className="text-gray-600 dark:text-gray-300 text-lg" />
            </button>

            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl sm:text-2xl"
            >
              🔖
            </motion.span>
            
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Link<span className="hidden xs:inline">Vault</span>
            </h1>
            
            <span className="hidden xs:inline-block text-[10px] sm:text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              Beta
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Add Button - Mobile/Desktop optimized */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base"
            >
              <FaPlus className="text-xs sm:text-sm" />
              <span className="hidden xs:inline">Add</span>
              <span className="hidden sm:inline">Link</span>
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden group"
              aria-label="Toggle theme"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"
              />
              
              {/* Sun icon */}
              <motion.div
                animate={{
                  rotate: darkMode ? -180 : 0,
                  scale: darkMode ? 0 : 1,
                  opacity: darkMode ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <FaSun className="text-yellow-500 text-base sm:text-xl" />
              </motion.div>
              
              {/* Moon icon */}
              <motion.div
                animate={{
                  rotate: darkMode ? 0 : 180,
                  scale: darkMode ? 1 : 0,
                  opacity: darkMode ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <FaMoon className="text-blue-400 text-base sm:text-xl" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar