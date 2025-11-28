// Structural Resume Templates - Different Layouts and Arrangements
// Only unique templates that render different layouts
export const templates = [
  {
    id: 'classic-sidebar',
    name: 'Classic Sidebar',
    description: 'Photo on left sidebar with contact info, skills on the side',
    category: 'Sidebar',
    layout: 'sidebar',
    hasPhoto: true,
    photoPosition: 'left',
    preview: 'bg-gradient-to-br from-blue-500 to-blue-700'
  },
  {
    id: 'modern-header',
    name: 'Modern Header',
    description: 'Photo at top center, clean single column layout',
    category: 'Modern',
    layout: 'header',
    hasPhoto: true,
    photoPosition: 'top',
    preview: 'bg-gradient-to-br from-purple-500 to-purple-700'
  },
  {
    id: 'two-column-balanced',
    name: 'Two Column Balanced',
    description: 'Two equal columns with photo in header',
    category: 'Two Column',
    layout: 'two-column',
    hasPhoto: true,
    photoPosition: 'top',
    preview: 'bg-gradient-to-br from-green-500 to-green-700'
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'No photo, single column, maximum content focus',
    category: 'Minimal',
    layout: 'single-column',
    hasPhoto: false,
    photoPosition: null,
    preview: 'bg-gradient-to-br from-gray-400 to-gray-600'
  }
];

export const getTemplateById = (id) => {
  return templates.find(t => t.id === id) || templates[0];
};

export const getTemplatesByCategory = (category) => {
  return templates.filter(t => t.category === category);
};

export const getAllCategories = () => {
  return [...new Set(templates.map(t => t.category))];
};
