// Section Design Templates - Different ways to style sections
export const sectionDesigns = [
  {
    id: 'card-modern',
    name: 'Card Modern',
    description: 'Modern card style with elegant shadows and rounded corners',
    category: 'Card',
    style: 'card'
  },
  {
    id: 'bordered-classic',
    name: 'Bordered Classic',
    description: 'Classic bordered sections with left border accent',
    category: 'Bordered',
    style: 'bordered'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-minimal with subtle dividers and clean typography',
    category: 'Minimal',
    style: 'minimal'
  },
  {
    id: 'gradient-header',
    name: 'Gradient Header',
    description: 'Gradient headers for each section with smooth transitions',
    category: 'Gradient',
    style: 'gradient'
  },
  {
    id: 'icon-accented',
    name: 'Icon Accented',
    description: 'Sections with icon accents and visual hierarchy',
    category: 'Icon',
    style: 'icon'
  },
  {
    id: 'timeline-vertical',
    name: 'Timeline Vertical',
    description: 'Vertical timeline style for experience/education',
    category: 'Timeline',
    style: 'timeline'
  },
  {
    id: 'glass-morphism',
    name: 'Glass Morphism',
    description: 'Modern glass effect with backdrop blur',
    category: 'Modern',
    style: 'glass'
  },
  {
    id: 'neon-accent',
    name: 'Neon Accent',
    description: 'Bold neon-style accents with vibrant colors',
    category: 'Modern',
    style: 'neon'
  },
  {
    id: 'diagonal-split',
    name: 'Diagonal Split',
    description: 'Diagonal color split with modern geometry',
    category: 'Modern',
    style: 'diagonal'
  },
  {
    id: 'badge-skills',
    name: 'Badge Skills',
    description: 'Skills displayed as badges/pills with hover effects',
    category: 'Badge',
    style: 'badge'
  },
  {
    id: 'elegant-divider',
    name: 'Elegant Divider',
    description: 'Elegant dividers with decorative elements',
    category: 'Elegant',
    style: 'divider'
  },
  {
    id: 'compact-grid',
    name: 'Compact Grid',
    description: 'Compact grid layout for dense information',
    category: 'Grid',
    style: 'grid'
  }
];

export const getSectionDesignById = (id) => {
  return sectionDesigns.find(d => d.id === id) || sectionDesigns[0];
};

export const getSectionDesignsByCategory = (category) => {
  return sectionDesigns.filter(d => d.category === category);
};

export const getAllSectionCategories = () => {
  return [...new Set(sectionDesigns.map(d => d.category))];
};

