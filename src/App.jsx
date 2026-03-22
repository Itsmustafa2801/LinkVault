import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkMode } from './hooks/useDarkMode'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LinkCard from './components/LinkCard'
import AddLinkModal from './components/AddLinkModal'
import SearchBar from './components/SearchBar'
import MobileNav from './components/MobileNav'
import { sampleLinks, allTags } from './data/sampleData'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('linkvault')
    return saved ? JSON.parse(saved) : sampleLinks
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Use the custom dark mode hook
  const { isDarkMode, toggleTheme } = useDarkMode()

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('linkvault', JSON.stringify(links))
  }, [links])

  // Get unique tags
  const tags = ['All', ...new Set(links.flatMap(link => link.tags))]

  // Filter links
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'All' || link.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // Add new link
  const addLink = (newLink) => {
    const link = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      favicon: '🔗',
      ...newLink
    }
    setLinks([link, ...links])
  }

  // Delete link
  const deleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id))
  }

  // Edit link
  const editLink = (id, updatedLink) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, ...updatedLink } : link
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        darkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onAddClick={() => setIsModalOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      
      {/* Mobile Navigation Overlay */}
      <MobileNav 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        tags={tags}
        selectedTag={selectedTag}
        onSelectTag={(tag) => {
          setSelectedTag(tag)
          setIsSidebarOpen(false)
        }}
        totalLinks={links.length}
        filteredCount={filteredLinks.length}
        links={links}
      />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar 
              tags={tags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              totalLinks={links.length}
              filteredCount={filteredLinks.length}
              links={links}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Stats Bar */}
            <div className="lg:hidden mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Links</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{links.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Showing</p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{filteredLinks.length}</p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <span>Filters</span>
                  <span>🔍</span>
                </button>
              </div>
            </div>

            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Links Grid */}
            {filteredLinks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md px-4"
              >
                <div className="text-5xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No links found
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
                  Try a different search or add a new link
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base"
                >
                  + Add your first link
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                <AnimatePresence>
                  {filteredLinks.map(link => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      layout
                      className="h-full"
                    >
                      <LinkCard 
                        link={link}
                        onDelete={deleteLink}
                        onEdit={editLink}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Link Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddLinkModal 
            onClose={() => setIsModalOpen(false)}
            onSave={addLink}
            allTags={allTags}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App