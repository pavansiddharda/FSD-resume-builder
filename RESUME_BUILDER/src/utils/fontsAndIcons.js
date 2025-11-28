// Microsoft Fonts for overall resume
export const availableFonts = [
  { id: 'default', name: 'Default (System)', value: 'inherit' },
  { id: 'calibri', name: 'Calibri', value: "'Calibri', 'Candara', 'Segoe', 'Segoe UI', 'Optima', Arial, sans-serif" },
  { id: 'cambria', name: 'Cambria', value: "'Cambria', 'Georgia', 'Times New Roman', serif" },
  { id: 'arial', name: 'Arial', value: "Arial, 'Helvetica Neue', Helvetica, sans-serif" },
  { id: 'times', name: 'Times New Roman', value: "'Times New Roman', Times, serif" },
  { id: 'verdana', name: 'Verdana', value: "Verdana, Geneva, sans-serif" },
  { id: 'tahoma', name: 'Tahoma', value: "Tahoma, Geneva, sans-serif" },
  { id: 'trebuchet', name: 'Trebuchet MS', value: "'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Arial, sans-serif" },
  { id: 'georgia', name: 'Georgia', value: "Georgia, 'Times New Roman', Times, serif" },
  { id: 'comic', name: 'Comic Sans MS', value: "'Comic Sans MS', cursive" },
  { id: 'courier', name: 'Courier New', value: "'Courier New', Courier, monospace" },
  { id: 'impact', name: 'Impact', value: "Impact, 'Arial Black', sans-serif" },
  { id: 'lucida', name: 'Lucida Console', value: "'Lucida Console', 'Lucida Sans Typewriter', monaco, 'Bitstream Vera Sans Mono', monospace" }
];

export const getFontById = (id) => {
  return availableFonts.find(f => f.id === id) || availableFonts[0];
};

