// image-optimizer.js
// (Archivo restaurado para optimización de imágenes SVG y normales)
document.addEventListener('DOMContentLoaded', function() {
    function optimizeSVGImages() {
        const svgImages = document.querySelectorAll('img[src$=".svg"]');
        svgImages.forEach(function(img) {
            if (img.dataset.optimized) return;
            img.dataset.optimized = 'true';
            img.onerror = function() {
                img.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-family=\'Arial\' font-size=\'14\' fill=\'%23666\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EImagen no disponible%3C/text%3E%3C/svg%3E';
            };
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            img.classList.add('svg-optimized');
        });
    }
    function optimizeRegularImages() {
        const images = document.querySelectorAll('img:not([src$=".svg"]):not([data-optimized])');
        images.forEach(function(img) {
            if (img.dataset.optimized) return;
            img.dataset.optimized = 'true';
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            if (!img.hasAttribute('onerror')) {
                const altText = img.alt || 'Imagen';
                img.onerror = function() {
                    if (this.src.includes('data:image')) return;
                    const width = this.width || 200;
                    const height = this.height || 200;
                    this.src = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(altText)}%3C/text%3E%3C/svg%3E`;
                };
            }
            img.classList.add('img-optimized');
        });
    }
    optimizeSVGImages();
    optimizeRegularImages();
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                optimizeSVGImages();
                optimizeRegularImages();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const style = document.createElement('style');
    style.textContent = `
        .svg-optimized, .img-optimized { transition: opacity 0.3s ease; }
        .svg-optimized[data-optimized], .img-optimized[data-optimized] { opacity: 0; animation: fadeIn 0.5s forwards; }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
    `;
    document.head.appendChild(style);
});
