/**
 * performance-utils.js
 * Utilidades para mejorar el rendimiento y gestión de errores en Ingenio Red
 */

// --- MEJORAS DE RENDIMIENTO Y PERSISTENCIA ---

/**
 * Cachear datos en localStorage para mejorar el rendimiento.
 * @param {string} key - La clave para identificar los datos.
 * @param {any} data - Los datos a almacenar.
 * @param {number} expirationMinutes - Tiempo de expiración en minutos.
 */
function cacheData(key, data, expirationMinutes = 60) {
    const now = new Date();
    const item = {
        data: data,
        expiry: now.getTime() + (expirationMinutes * 60 * 1000)
    };
    try {
        localStorage.setItem(`ingenio_${key}`, JSON.stringify(item));
    } catch (error) {
        console.warn("No se pudieron cachear los datos:", error);
    }
}

/**
 * Obtiene datos cacheados si no han expirado.
 * @param {string} key - La clave para identificar los datos.
 * @returns {any|null} - Los datos o null si no existe o expiró.
 */
function getCachedData(key) {
    const itemStr = localStorage.getItem(`ingenio_${key}`);
    if (!itemStr) return null;
    
    try {
        const item = JSON.parse(itemStr);
        const now = new Date();
        
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(`ingenio_${key}`);
            return null;
        }
        
        return item.data;
    } catch (error) {
        console.error("Error al recuperar datos de caché:", error);
        localStorage.removeItem(`ingenio_${key}`);
        return null;
    }
}

/**
 * Carga productos con soporte de caché
 * @returns {Promise<Array>} - Una promesa con los productos
 */
async function loadProductsWithCache() {
    try {
        // Primero intentar obtener datos de cache
        const cachedProducts = getCachedData('products');
        if (cachedProducts) {
            console.log("Usando productos de caché local");
            
            // Actualizar caché en segundo plano
            fetchProductsInBackground();
            return cachedProducts;
        }
        
        // Si no hay caché, cargar desde el servidor
        const response = await fetch('productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');
        const products = await response.json();
        
        // Guardar en caché para futuras visitas
        cacheData('products', products, 30); // 30 minutos de caché
        
        return products;
    } catch (error) {
        console.error('Error al cargar productos:', error);
        throw error;
    }
}

/**
 * Actualiza la caché de productos en segundo plano sin bloquear la interfaz
 */
async function fetchProductsInBackground() {
    try {
        console.log("Actualizando datos en segundo plano...");
        const response = await fetch('productos.json');
        if (response.ok) {
            const freshProducts = await response.json();
            const currentProducts = getCachedData('products') || [];
            cacheData('products', freshProducts, 30);
            
            // Actualizar solo si hay diferencias significativas
            if (JSON.stringify(freshProducts) !== JSON.stringify(currentProducts)) {
                console.log("Datos actualizados en segundo plano, refrescando...");
                return freshProducts;
            }
        }
        return null;
    } catch (error) {
        console.warn("Error al actualizar productos en segundo plano:", error);
        return null;
    }
}

/**
 * Mejorar el manejo de errores para las imágenes
 * @param {HTMLImageElement} img - El elemento de imagen
 * @param {string} fallbackText - Texto alternativo si la imagen falla
 * @returns {HTMLImageElement} - La misma imagen con el evento onerror configurado
 */
function handleImageError(img, fallbackText) {
    img.onerror = () => {
        console.warn(`Imagen no cargada: ${img.src}`);
        // Crear un elemento de reemplazo
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = fallbackText || 'Imagen no disponible';
        placeholder.style.backgroundColor = '#f0f0f0';
        placeholder.style.color = '#666';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.padding = '20px';
        placeholder.style.border = '1px dashed #ccc';
        placeholder.style.borderRadius = '4px';
        placeholder.style.width = '100%';
        placeholder.style.height = '200px';
        
        // Reemplazar la imagen con el placeholder
        if (img.parentNode) {
            img.parentNode.replaceChild(placeholder, img);
        }
        
        // Reportar el error a la consola
        console.log(`Recurso no disponible: ${img.src}`);
    };
    return img;
}

/**
 * Recupera un elemento del DOM y muestra un mensaje de error si no existe
 * @param {string} selector - El selector CSS del elemento
 * @param {string} errorMessage - Mensaje de error opcional
 * @returns {Element|null} - El elemento o null si no existe
 */
function getElementSafely(selector, errorMessage = null) {
    const element = document.querySelector(selector);
    if (!element && errorMessage) {
        console.warn(`${errorMessage} (Selector: "${selector}")`);
    }
    return element;
}

/**
 * Convierte un precio en formato colombiano a número
 * @param {string|number} precio - El precio en formato string con puntos o comas
 * @returns {number} - El precio como número
 */
function parsePrecio(precio) {
    if (typeof precio === 'number') return precio;
    return parseFloat(String(precio).replace(/\./g, '').replace(',', '.')) || 0;
}

/**
 * Formatea un precio como moneda colombiana
 * @param {number} precio - El precio como número
 * @returns {string} - El precio formateado
 */
function formatPrecio(precio) {
    return new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP', 
        maximumFractionDigits: 0 
    }).format(precio);
}

/**
 * Medición de rendimiento básica
 */
function reportPerformance() {
    setTimeout(() => {
        if (window.performance) {
            const navigation = performance.getEntriesByType("navigation")[0];
            if (navigation) {
                console.log("📊 Métricas de rendimiento:");
                console.log("➡️ Tiempo de carga del DOM: " + Math.round(navigation.domComplete) + "ms");
                console.log("➡️ Tiempo de carga de la página: " + Math.round(navigation.loadEventEnd) + "ms");
            }
            
            // Métricas específicas
            const lcp = performance.getEntriesByType("paint").find(entry => entry.name === "largest-contentful-paint");
            if (lcp) {
                console.log("➡️ Largest Contentful Paint: " + Math.round(lcp.startTime) + "ms");
            }
        }
    }, 0);
}

// Exportar las funciones para uso global
window.cacheData = cacheData;
window.getCachedData = getCachedData;
window.loadProductsWithCache = loadProductsWithCache;
window.handleImageError = handleImageError;
window.getElementSafely = getElementSafely;
window.parsePrecio = parsePrecio;
window.formatPrecio = formatPrecio;
window.reportPerformance = reportPerformance;
