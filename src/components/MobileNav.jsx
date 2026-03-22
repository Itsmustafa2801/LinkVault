import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTag, FaLayerGroup, FaBookmark } from 'react-icons/fa'

const MobileNav = ({ isOpen, onClose, tags, selectedTag, onSelectTag, totalLinks, filteredCount, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />
          
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-blue-600 dark:text-blue-400 text-xl" />
                  <h2 className="font-semibold text-gray-800 dark:text-white">Collections</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FaTimes className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Stats */}
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Links</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {totalLinks}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-500">
                  <FaBookmark className="text-blue-500" />
                  <span>{filteredCount} shown</span>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Filters
                </p>
                {tags.map(tag => {
                  const tagCount = links 
                    ? links.filter(l => l.tags && l.tags.includes(tag)).length 
                    : 0
                  
                  return (
                    <button
                      key={tag}
                      onClick={() => onSelectTag(tag)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${
                        selectedTag === tag
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <FaTag size={14} className={selectedTag === tag ? 'text-white' : 'text-gray-400'} />
                      <span className="flex-1 text-sm font-medium">{tag}</span>
                      {tag !== 'All' && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedTag === tag 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {tagCount}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Reset filter */}
              {selectedTag !== 'All' && (
                <button
                  onClick={() => {
                    onSelectTag('All')
                    onClose()
                  }}
                  className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline text-center py-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNav