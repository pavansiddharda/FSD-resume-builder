// Predefined Color Palettes
export const colorPalettes = [
  {
    id: 'blue-professional',
    name: 'Blue Professional',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Professional'
  },
  {
    id: 'purple-elegant',
    name: 'Purple Elegant',
    primary: '#9333ea',
    secondary: '#7e22ce',
    accent: '#a855f7',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Elegant'
  },
  {
    id: 'green-fresh',
    name: 'Green Fresh',
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#22c55e',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Fresh'
  },
  {
    id: 'red-bold',
    name: 'Red Bold',
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#ef4444',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Bold'
  },
  {
    id: 'orange-creative',
    name: 'Orange Creative',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#f97316',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Creative'
  },
  {
    id: 'teal-modern',
    name: 'Teal Modern',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#14b8a6',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Modern'
  },
  {
    id: 'indigo-sophisticated',
    name: 'Indigo Sophisticated',
    primary: '#4f46e5',
    secondary: '#4338ca',
    accent: '#6366f1',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Sophisticated'
  },
  {
    id: 'pink-energetic',
    name: 'Pink Energetic',
    primary: '#db2777',
    secondary: '#be185d',
    accent: '#ec4899',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Energetic'
  },
  {
    id: 'gray-minimal',
    name: 'Gray Minimal',
    primary: '#4b5563',
    secondary: '#374151',
    accent: '#6b7280',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Minimal'
  },
  {
    id: 'cyan-tech',
    name: 'Cyan Tech',
    primary: '#0891b2',
    secondary: '#0e7490',
    accent: '#06b6d4',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Tech'
  },
  {
    id: 'amber-warm',
    name: 'Amber Warm',
    primary: '#d97706',
    secondary: '#b45309',
    accent: '#f59e0b',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Warm'
  },
  {
    id: 'emerald-natural',
    name: 'Emerald Natural',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Natural'
  },
  {
    id: 'navy-corporate',
    name: 'Navy Corporate',
    primary: '#1e3a8a',
    secondary: '#1e40af',
    accent: '#2563eb',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Corporate'
  },
  {
    id: 'rose-soft',
    name: 'Rose Soft',
    primary: '#e11d48',
    secondary: '#be123c',
    accent: '#f43f5e',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Soft'
  },
  {
    id: 'violet-royal',
    name: 'Violet Royal',
    primary: '#6b21a8',
    secondary: '#581c87',
    accent: '#8b5cf6',
    text: '#1f2937',
    background: '#ffffff',
    category: 'Royal'
  }
];

export const getPaletteById = (id) => {
  return colorPalettes.find(p => p.id === id) || colorPalettes[0];
};

export const getPalettesByCategory = (category) => {
  return colorPalettes.filter(p => p.category === category);
};

export const getAllPaletteCategories = () => {
  return [...new Set(colorPalettes.map(p => p.category))];
};

