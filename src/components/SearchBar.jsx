import React from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-3 sm:mb-4 lg:mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search links..."
          className="w-full pl-9 sm:pl-10 lg:pl-12 pr-8 sm:pr-10 py-2 sm:py-2.5 lg:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors text-sm sm:text-base"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm sm:text-base" />
        
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTimes className="text-sm sm:text-base" />
          </button>
        )}
      </div>
      
      {/* Search stats */}
      {searchTerm && (
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
          Searching for: "{searchTerm}"
        </p>
      )}
    </div>
  )
}

export default SearchBar