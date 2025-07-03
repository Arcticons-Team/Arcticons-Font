// Function to check if a glyph is supported by the font
function isGlyphSupported(glyph) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fallbackFont = 'serif';
    
    // Draw with fallback font
    ctx.font = `24px ${fallbackFont}`;
    const fallbackWidth = ctx.measureText(glyph).width;
    
    // Draw with Arcticons Sans
    ctx.font = `24px 'Arcticons Sans', ${fallbackFont}`;
    const actualWidth = ctx.measureText(glyph).width;
    
    // If widths are different, the font is being used
    return actualWidth !== fallbackWidth;
}
// Fetch and process the glyphs.yml file
fetch('../data/glyphs.yml')
    .then(response => response.text())
    .then(text => {
        // Remove any YAML comments and extract the glyph string
        const glyphs = text.replace(/^#.*$/gm, '').trim();
        
        // Create the grid
        const letterGrid = document.getElementById('letterGrid');
        const previewContent = document.querySelector('.preview-content');
        
        // Split the string into individual characters and remove any empty items
        [...glyphs].forEach(glyph => {
            if (glyph.trim()) {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                gridItem.textContent = glyph;
                
                // Check if the glyph is supported and add class if not
                if (!isGlyphSupported(glyph)) {
                    gridItem.classList.add('unsupported');
                }
                
                letterGrid.appendChild(gridItem);
                
                // Add hover event listener
                gridItem.addEventListener('mouseenter', () => {
                    previewContent.textContent = glyph;
                });
            }
        });
        // Set initial preview letter
        const firstGlyph = [...glyphs][0] || 'A';
        previewContent.textContent = firstGlyph;
    })
    .catch(error => console.error('Error loading glyphs:', error));