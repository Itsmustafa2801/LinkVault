export const sampleLinks = [
  {
    id: '1',
    url: 'https://react.dev',
    title: 'React Documentation',
    description: 'Official React docs - learn everything about React',
    tags: ['dev', 'react', 'docs'],
    favicon: '🔷',
    date: '2024-03-15'
  },
  {
    id: '2',
    url: 'https://tailwindcss.com',
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    tags: ['dev', 'css', 'design'],
    favicon: '🎨',
    date: '2024-03-14'
  },
  {
    id: '3',
    url: 'https://github.com/trending',
    title: 'GitHub Trending',
    description: 'See what the GitHub community is most excited about today',
    tags: ['dev', 'github', 'code'],
    favicon: '🐙',
    date: '2024-03-13'
  },
  {
    id: '4',
    url: 'https://vercel.com',
    title: 'Vercel',
    description: 'Deploy your React apps instantly',
    tags: ['dev', 'hosting', 'deploy'],
    favicon: '▲',
    date: '2024-03-12'
  },
  {
    id: '5',
    url: 'https://coolors.co',
    title: 'Coolors',
    description: 'Generate beautiful color palettes',
    tags: ['design', 'colors', 'tools'],
    favicon: '🎨',
    date: '2024-03-11'
  },
  {
    id: '6',
    url: 'https://unsplash.com',
    title: 'Unsplash',
    description: 'Free high-quality images',
    tags: ['design', 'images', 'resources'],
    favicon: '📸',
    date: '2024-03-10'
  }
]

// Generate all unique tags from sampleLinks
export const allTags = [...new Set(sampleLinks.flatMap(link => link.tags))]