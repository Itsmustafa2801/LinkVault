import React from 'react'
import { motion } from 'framer-motion'
import { FaTag, FaLayerGroup, FaBookmark } from 'react-icons/fa'

const Sidebar = ({ tags, selectedTag, onSelectTag, totalLinks, filteredCount, links }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 lg:p-6 sticky top-20 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-5 lg:mb-6">
        <FaLayerGroup className="text-blue-600 dark:text-blue-400 text-lg lg:text-xl" />
        <h2 className="font-semibold text-gray-800 dark:text-white text-base lg:text-lg">Collections</h2>
      </div>

      {/* Stats */}
      <div className="mb-5 lg:mb-6 p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Total Links</p>
        <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {totalLinks}
        </p>
        <div className="flex items-center gap-1 mt-1 lg:mt-2 text-xs text-gray-500 dark:text-gray-500">
          <FaBookmark className="text-blue-500 text-xs" />
          <span>{filteredCount} shown</span>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 lg:mb-3">
          Filters
        </p>
        {tags.map(tag => {
          const tagCount = links 
            ? links.filter(l => l.tags && l.tags.includes(tag)).length 
            : 0
          
          return (
            <motion.button
              key={tag}
              whileHover={{ x: 3 }}
              onClick={() => onSelectTag(tag)}
              className={`w-full text-left px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg flex items-center gap-2 transition-all text-sm lg:text-base ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FaTag size={12} className={selectedTag === tag ? 'text-white' : 'text-gray-400'} />
              <span className="flex-1 font-medium">{tag}</span>
              {tag !== 'All' && (
                <span className={`text-xs px-1.5 lg:px-2 py-0.5 rounded-full ${
                  selectedTag === tag 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {tagCount}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Reset filter */}
      {selectedTag !== 'All' && (
        <button
          onClick={() => onSelectTag('All')}
          className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

export default Sidebar