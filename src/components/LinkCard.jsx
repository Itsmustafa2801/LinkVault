import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaCopy, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

const LinkCard = ({ link, onDelete, onEdit }) => {
  const [showActions, setShowActions] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(link.title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onEdit(link.id, { ...link, title: editedTitle })
      setIsEditing(false)
    }
  }

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  return (
    <motion.div
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all p-3 sm:p-4 relative group border border-gray-100 dark:border-gray-700 h-full"
    >
      {/* Actions Overlay - Touch friendly on mobile */}
      <div className="absolute top-2 right-2 flex gap-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-1 border border-gray-200 dark:border-gray-600 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
          title="Copy URL"
        >
          {copied ? <FaCheck className="text-green-500 text-xs sm:text-sm" /> : <FaCopy className="text-xs sm:text-sm" />}
        </button>
        <button
          onClick={() => window.open(link.url, '_blank')}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
          title="Open Link"
        >
          <FaExternalLinkAlt className="text-xs sm:text-sm" />
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
          title="Edit"
        >
          <FaEdit className="text-xs sm:text-sm" />
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="p-1.5 sm:p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-500 transition-colors"
          title="Delete"
        >
          <FaTrash className="text-xs sm:text-sm" />
        </button>
      </div>

      <div className="flex items-start gap-2 sm:gap-3">
        {/* Favicon */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-xl sm:text-2xl flex-shrink-0">
          {getFavicon(link.url) ? (
            <img src={getFavicon(link.url)} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            link.favicon
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white text-sm"
                autoFocus
              />
              <div className="flex gap-1">
                <button
                  onClick={handleSaveEdit}
                  className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 sm:px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-xs sm:text-sm"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ) : (
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors pr-16 sm:pr-0">
              {link.title}
            </h3>
          )}
          
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate mb-1 sm:mb-2">
            {link.url.replace('https://', '').replace('http://', '').substring(0, 30)}
            {link.url.length > 30 ? '...' : ''}
          </p>
          
          {link.description && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2">
              {link.description}
            </p>
          )}
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
            {link.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 sm:px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Date */}
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
            {new Date(link.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default LinkCard