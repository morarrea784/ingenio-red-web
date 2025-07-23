console.log("🚀 === CARRITO INTELIGENTE OPTIMIZADO + WHATSAPP CHECKOUT ===");
console.log("✅ Funcionalidades implementadas y optimizadas:");
console.log("   • Botón continuar minimalista");
console.log("   • Imágenes de productos compactas (50x50px)");
console.log("   • Sección de totales simplificada");
console.log("   • Event listeners mejorados para WhatsApp");
console.log("   • Lazy loading optimizado para imágenes");
console.log("   • Debounce para actualizaciones de cantidad");
console.log("   • Icono SVG profesional del carrito");
console.log("   • Control completo de cantidades (+/-)");
console.log("   • Cálculo preciso de totales y descuentos");
console.log("   • Formulario de cliente mejorado");
console.log("   • Mensaje WhatsApp profesional estructurado");
console.log("   • Interfaz moderna y responsiva");
console.log("   • Animaciones suaves");
console.log("🛒 ¡Carrito optimizado listo para uso!");

// scripts.js - VERSIÓN PERFECCIONADA CON BUSCADOR FUNCIONAL
// Variables globales para acceso universal
let allProducts = [];
let cart = JSON.parse(localStorage.getItem('ingenioCart')) || [];
const WHATSAPP_NUMBER = '+573185801243';

// 🎛️ SISTEMA DE CONTROL DE MEJORAS - FASE 4 PERFECCIONADA
const ENHANCEMENT_CONFIG = {
    enhancedCards: true,        // Tarjetas mejoradas (FASE 1)
    schemaMarkup: true,         // SEO Schema (FASE 1)
    productBadges: true,        // Badges de oferta/nuevo (FASE 1)
    priceComparison: true,      // Comparación de precios (FASE 1)
    ratingSystem: true,         // Sistema de rating (FASE 2)
    advancedCTA: true,          // Botones optimizados (FASE 2)
    hoverEffects: true,         // Efectos hover avanzados (FASE 2)
    productInfo: true,          // Info adicional en hover (FASE 2)
    urgencyIndicators: true,    // Indicadores de urgencia (FASE 3) ⭐ NUEVO
    smartRecommendations: true, // Recomendaciones inteligentes (FASE 3) ⭐ NUEVO
    conversionBoost: true,      // Optimizaciones de conversión (FASE 3) ⭐ NUEVO
    
    // 🚀 FASE 4 - FUNCIONALIDADES PERFECCIONADAS
    productComparison: false,   // Sistema de comparación ELIMINADO
    favoriteSystem: false,      // Sistema de favoritos ELIMINADO ❌
    quickPreview: false,        // Vista previa rápida DESACTIVADA
    socialProof: false,         // Prueba social ELIMINADA ❌
    smartLabels: true,          // Etiquetas PARA TODOS los productos ⭐
    imageZoom: true            // Zoom de imagen al hover ⭐
};

console.log("� Sistema de mejoras cargado - FASE 3 FINAL activa");

// Función de búsqueda simple y efectiva
function setupWorkingSearch() {
    console.log("🔍 Configurando buscador funcional...");
    
    const searchBar = document.querySelector('.search-bar');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (!searchBar || !searchSuggestions) {
        console.log("⏳ Elementos no encontrados, reintentando...");
        setTimeout(setupWorkingSearch, 500);
        return;
    }
    
    if (!allProducts || allProducts.length === 0) {
        console.log("⏳ Productos no cargados, reintentando...");
        setTimeout(setupWorkingSearch, 500);
        return;
    }
    
    console.log("✅ Configurando event listeners del buscador...");
    
    // Event listener para input
    searchBar.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        console.log("🔍 Búsqueda:", query);
        
        if (query.length < 2) {
            searchSuggestions.style.display = 'none';
            return;
        }
        
        // Búsqueda inteligente
        const results = allProducts.filter(product => {
            const nombre = (product.nombre || product.nombre_producto || '').toLowerCase();
            const categoria = (product.categoria_principal || '').toLowerCase();
            const descripcion = (product.descripcion_corta || '').toLowerCase();
            
            return nombre.includes(query) || 
                   categoria.includes(query) || 
                   descripcion.includes(query);
        }).slice(0, 6);
        
        console.log("🎯 Resultados:", results.length);
        
        // Debug: mostrar información de las primeras imágenes
        results.slice(0, 2).forEach((product, index) => {
            console.log(`🖼️ Producto ${index + 1}:`, {
                nombre: product.nombre || product.nombre_producto,
                imagen_principal: product.imagen_principal,
                imagenes: product.imagenes,
                imagen: product.imagen
            });
        });
        
        showSearchResults(results, query, searchSuggestions);
    });
    
    // Ocultar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });
    
    console.log("✅ Buscador configurado correctamente!");
}

function showSearchResults(results, query, container) {
    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-no-results">
                <span>No se encontraron productos para "${query}"</span>
                <small>Intenta con términos más generales</small>
            </div>`;
        container.style.display = 'block';
        return;
    }
    
    const html = results.map(product => {
        const nombre = product.nombre || product.nombre_producto || 'Sin nombre';
        const categoria = product.categoria_principal || '';
        
        // Verificar múltiples fuentes de imagen
        let imagen = '';
        if (product.imagen_principal) {
            imagen = product.imagen_principal;
        } else if (product.imagenes && product.imagenes[0]) {
            imagen = product.imagenes[0];
        } else if (product.imagen) {
            imagen = product.imagen;
        } else {
            imagen = 'https://via.placeholder.com/50x50/0d1b2a/ffffff?text=IMG';
        }
        
        // 💰 LÓGICA CORREGIDA PARA PRECIOS - Priorizar precio_final
        let precio = '';
        if (product.precio_oferta && product.precio_oferta !== '') {
            precio = product.precio_oferta; // Si hay oferta, usarla (primera prioridad)
        } else if (product.precio_final && product.precio_final !== '') {
            // Formatear precio_final que viene sin símbolo $
            const precioParsed = parseColombianPrice(product.precio_final);
            precio = formatPrice(precioParsed); // Si hay precio final, usarlo
        } else if (product.precio && product.precio !== '') {
            precio = product.precio; // Si hay precio normal, usarlo
        } else {
            precio = 'Consultar precio';
        }
        
        return `
            <div class="search-suggestion-item" data-product-id="${product.id_del_producto}">
                <img src="${imagen}" 
                     alt="${nombre}" 
                     class="suggestion-image" 
                     onerror="this.src='https://via.placeholder.com/50x50/0d1b2a/ffffff?text=IMG'; this.style.backgroundColor='#f0f0f0';"
                     onload="console.log('✅ Imagen cargada:', this.src)">
                <div class="suggestion-content">
                    <div class="suggestion-name">${highlightText(nombre, query)}</div>
                    <div class="suggestion-category">${categoria}</div>
                    <div class="suggestion-price">$${formatPrice(precio)}</div>
                </div>
                <div class="suggestion-action">Ver</div>
            </div>`;
    }).join('');
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // Agregar event listeners a cada sugerencia
    container.querySelectorAll('.search-suggestion-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            selectProduct(productId);
        });
    });
    
    console.log('🖼️ Sugerencias mostradas con imágenes y event listeners');
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function formatPrice(price) {
    if (!price) return 'Consultar precio';
    
    // Convertir a string y limpiar
    let priceStr = String(price).trim();
    
    // Si ya tiene símbolo $, removerlo temporalmente
    priceStr = priceStr.replace(/[$]/g, '');
    
    // Formato colombiano: "11.000,00" donde . es separador de miles y , es decimal
    // Primero reemplazar coma por punto temporal para parsear
    let cleanPrice = priceStr.replace(/\./g, '').replace(/,/g, '.');
    
    // Convertir a número
    const numPrice = parseFloat(cleanPrice);
    
    if (isNaN(numPrice)) return 'Consultar precio';
    
    // Formatear correctamente en pesos colombianos
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numPrice);
}

// ⭐ FUNCIÓN DE BADGES DINÁMICOS - FASE 1 (CORREGIDA)
function generateProductBadges(product) {
    if (!ENHANCEMENT_CONFIG.productBadges) return '';
    
    const badges = [];
    
    // Función auxiliar para parsear precios correctamente
    function parseColombianPrice(price) {
        if (!price) return 0;
        let cleanPrice = String(price).replace(/[$]/g, '').replace(/\./g, '').replace(/,/g, '.');
        return parseFloat(cleanPrice) || 0;
    }
    
    // Badge de descuento si tiene precio original
    if (product.precio_original && product.precio_final) {
        const original = parseColombianPrice(product.precio_original);
        const final = parseColombianPrice(product.precio_final);
        
        if (original > final) {
            const discount = Math.round(((original - final) / original) * 100);
            if (discount > 0) {
                badges.push(`<span class="product-badge product-badge-discount">-${discount}%</span>`);
            }
        }
    }
    
    // Badge de nuevo producto (últimas 30 días simulado por ID alto)
    const productId = parseInt(product.id_del_producto) || 0;
    if (productId > 950) {
        badges.push(`<span class="product-badge product-badge-new">NUEVO</span>`);
    }
    
    // Badge de oferta especial (productos con descuento > 20%)
    if (product.precio_original && product.precio_final) {
        const original = parseColombianPrice(product.precio_original);
        const final = parseColombianPrice(product.precio_final);
        const discount = ((original - final) / original) * 100;
        
        if (discount >= 20) {
            badges.push(`<span class="product-badge product-badge-hot">🔥 OFERTA</span>`);
        }
    }
    
    return badges.length > 0 ? `<div class="product-badges">${badges.join('')}</div>` : '';
}

// 💰 FUNCIÓN DE COMPARACIÓN DE PRECIOS CON URGENCIA - FASE 1 (CORREGIDA)
function generatePriceComparison(product) {
    if (!ENHANCEMENT_CONFIG.priceComparison) {
        // Usar lógica correcta de precios
        let precio = '';
        if (product.precio_oferta && product.precio_oferta !== '') {
            precio = product.precio_oferta;
        } else if (product.precio_final && product.precio_final !== '') {
            const precioParsed = parseColombianPrice(product.precio_final);
            precio = formatPrice(precioParsed);
        } else if (product.precio && product.precio !== '') {
            precio = product.precio;
        } else {
            precio = 'Consultar precio';
        }
        return `<div class="product-price">${precio}</div>`;
    }
    
    let priceHTML = '';
    
    // Obtener indicadores de urgencia
    const urgencyIndicators = generateUrgencyIndicators(product);
    
    // 💰 LÓGICA CORREGIDA: Comparar precio vs precio_final
    if (product.precio && product.precio_final) {
        const original = parseColombianPrice(product.precio); // precio con $
        const final = parseColombianPrice(product.precio_final); // precio_final sin $
        
        if (final > original) { // Si precio_final es mayor, mostrar como precio real
            priceHTML = `
                <div class="price-with-urgency">
                    <span class="product-price">${formatPrice(final)}</span>
                    ${urgencyIndicators.length > 0 ? generateUrgencyBadge(urgencyIndicators[0]) : ''}
                </div>
            `;
        } else if (original > final) { // Si hay descuento real
            const savings = original - final;
            const savingsFormatted = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(savings);
            
            priceHTML = `
                <div class="product-price-comparison">
                    <div class="price-original">Antes: ${product.precio}</div>
                    <div class="price-with-urgency">
                        <span class="price-final">${formatPrice(final)}</span>
                        ${urgencyIndicators.length > 0 ? generateUrgencyBadge(urgencyIndicators[0]) : ''}
                    </div>
                    <div class="price-savings">Ahorras: ${savingsFormatted}</div>
                </div>
            `;
        }
    } else {
        // Solo mostrar precio_final con formato correcto
        let precio = '';
        if (product.precio_final && product.precio_final !== '') {
            const precioParsed = parseColombianPrice(product.precio_final);
            precio = formatPrice(precioParsed);
        } else if (product.precio && product.precio !== '') {
            precio = product.precio;
        } else {
            precio = 'Consultar precio';
        }
        
        priceHTML = `
            <div class="price-with-urgency">
                <span class="product-price">${precio}</span>
                ${urgencyIndicators.length > 0 ? generateUrgencyBadge(urgencyIndicators[0]) : ''}
            </div>
        `;
    }
    
    return priceHTML;
}

// 🔥 Función para generar badge de urgencia junto al precio (SIMPLIFICADA)
function generateUrgencyBadge(indicator) {
    if (!indicator) return '';
    
    const classMap = {
        'low': 'urgency-badge-low',
        'popular': 'urgency-badge-popular'
    };
    
    return `<span class="urgency-badge ${classMap[indicator.type]}">${indicator.icon} ${indicator.text}</span>`;
}

// ⭐ SISTEMA DE RATING DINÁMICO - FASE 2
function generateProductRating(product) {
    if (!ENHANCEMENT_CONFIG.ratingSystem) return '';
    
    // Algoritmo de rating basado en múltiples factores
    let rating = 3.5; // Base rating
    
    // Factor 1: Descuento (productos con descuento tienen mejor rating)
    if (product.precio_original && product.precio_final) {
        const original = parseFloat(product.precio_original.replace(/[^0-9.]/g, ''));
        const final = parseFloat(product.precio_final.replace(/[^0-9.]/g, ''));
        const discount = ((original - final) / original) * 100;
        
        if (discount >= 30) rating += 1.0;
        else if (discount >= 20) rating += 0.7;
        else if (discount >= 10) rating += 0.4;
    }
    
    // Factor 2: ID del producto (productos más nuevos tienen mejor rating)
    const productId = parseInt(product.id_del_producto) || 0;
    if (productId > 950) rating += 0.5;
    else if (productId > 800) rating += 0.3;
    
    // Factor 3: Disponibilidad
    if (product.stock > 0) rating += 0.2;
    
    // Factor 4: Aleatorio para variedad (0.1 - 0.4)
    rating += Math.random() * 0.3 + 0.1;
    
    // Normalizar entre 3.0 y 5.0
    rating = Math.min(5.0, Math.max(3.0, rating));
    
    // Redondear a .0 o .5
    rating = Math.round(rating * 2) / 2;
    
    // Generar número de reseñas (15-150)
    const reviewCount = Math.floor(Math.random() * 136) + 15;
    
    return generateStarsHTML(rating, reviewCount);
}

function generateStarsHTML(rating, reviewCount) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '<div class="product-rating">';
    starsHTML += '<div class="stars">';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star star-full">★</span>';
    }
    
    // Media estrella
    if (hasHalfStar) {
        starsHTML += '<span class="star star-half">★</span>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star star-empty">☆</span>';
    }
    
    starsHTML += '</div>';
    starsHTML += `<div class="rating-info">`;
    starsHTML += `<span class="rating-number">${rating}</span>`;
    starsHTML += `<span class="review-count">(${reviewCount})</span>`;
    starsHTML += `</div>`;
    starsHTML += '</div>';
    
    return starsHTML;
}

// 🎯 BOTONES CTA OPTIMIZADOS - FASE 2 (AJUSTADO)
function createAdvancedCTAButtons(product) {
    if (!ENHANCEMENT_CONFIG.advancedCTA) {
        return `
            <div class="product-actions">
                ${createAddToCartButtonHTML(product)}
                <button class="btn-quick-view" onclick="openProductModal(allProducts.find(p => p.id_del_producto == '${product.id_del_producto}'))" aria-label="Vista rápida de ${product.nombre_producto}">
                    👁️ Vista rápida
                </button>
            </div>
        `;
    }

    const isOutOfStock = product.stock <= 0;
    const productPrice = parseFloat(String(product.precio_final).replace(/[^0-9.]/g, '')) || 0;
    
    // Clase especial para productos en oferta
    const hasDiscount = product.precio_original && 
        parseFloat(product.precio_original.replace(/[^0-9.]/g, '')) > productPrice;
    
    return `
        <div class="product-actions advanced">
            ${!isOutOfStock ? `
                <button class="btn-add-to-cart ${hasDiscount ? 'offer' : ''}" 
                        onclick="addToCart('${product.id_del_producto}')"
                        aria-label="Agregar ${product.nombre_producto} al carrito">
                    <span class="btn-icon">🛒</span>
                    <span class="btn-text">Agregar al carrito</span>
                    ${hasDiscount ? '<span class="btn-badge">OFERTA</span>' : ''}
                </button>
            ` : `
                <button class="btn-out-of-stock" disabled aria-label="Producto agotado">
                    <span class="btn-icon">❌</span>
                    <span class="btn-text">Producto agotado</span>
                </button>
            `}
            
            <button class="btn-quick-view-advanced" 
                    onclick="openProductModal(allProducts.find(p => p.id_del_producto == '${product.id_del_producto}'))" 
                    aria-label="Vista rápida de ${product.nombre_producto}">
                <span class="btn-icon">👁️</span>
                <span class="btn-text">Ver detalles</span>
            </button>
        </div>
    `;
}

// 💬 Función para contacto por WhatsApp
function contactWhatsApp(productName, price) {
    const message = `Hola! Me interesa el producto: ${productName} - ${price}. ¿Podrían darme más información?`;
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ℹ️ INFORMACIÓN ADICIONAL EN HOVER - DESACTIVADO (Solicitud del usuario)
function generateProductHoverInfo(product) {
    // Función desactivada por solicitud del usuario
    return '';
}

// 🔥 INDICADORES DE URGENCIA Y ESCASEZ - FASE 3 (LÓGICA SIMPLIFICADA)
function generateUrgencyIndicators(product) {
    if (!ENHANCEMENT_CONFIG.urgencyIndicators) return '';
    
    const indicators = [];
    const productId = parseInt(product.id_del_producto) || 0;
    
    // 🎯 SOLO MOSTRAR INDICADORES ESPECÍFICOS SEGÚN NUEVAS REGLAS
    
    // POPULAR: Cada 7 productos (cambiado de 9 a 7)
    if (productId % 7 === 0) {
        indicators.push({
            type: 'popular',
            text: '¡Muy solicitado!',
            icon: '⭐'
        });
    }
    
    // POCAS UNIDADES: Solo ocasionalmente (cada 5 productos)
    // Solo mostrar si no es popular para evitar conflictos
    if (productId % 5 === 0 && productId % 7 !== 0) {
        indicators.push({
            type: 'low',
            text: '¡Pocas unidades!',
            icon: '🔥'
        });
    }
    
    // NO mostrar crítico ni disponible según las nuevas reglas
    
    return indicators;
}

// 🤖 RECOMENDACIONES INTELIGENTES - FASE 3
function generateSmartRecommendations(product, allProducts) {
    if (!ENHANCEMENT_CONFIG.smartRecommendations) return '';
    
    // Encontrar productos relacionados por categoría
    const relatedProducts = allProducts
        .filter(p => p.categoria_principal === product.categoria_principal && p.id_del_producto !== product.id_del_producto)
        .slice(0, 3);
    
    if (relatedProducts.length === 0) return '';
    
    return `
        <div class="smart-recommendations">
            <div class="recommendations-header">
                <span class="recommendations-icon">💡</span>
                <span class="recommendations-text">También te puede interesar</span>
            </div>
        </div>
    `;
}

// 🎯 OPTIMIZACIONES DE CONVERSIÓN - FASE 3 (FIJO PARA TODOS)
function generateConversionBoosts(product) {
    if (!ENHANCEMENT_CONFIG.conversionBoost) return '';
    
    // ✅ SIEMPRE mostrar ambos badges para TODOS los productos
    return `
        <div class="conversion-boosts">
            <div class="conversion-boost secure">
                <span class="boost-icon">🔐</span>
                <span class="boost-text">Pago 100% seguro</span>
            </div>
            <div class="conversion-boost warranty">
                <span class="boost-icon">🎯</span>
                <span class="boost-text">Garantía incluida</span>
            </div>
        </div>
    `;
}

// 🛠️ Función auxiliar para parsear precios (reutilizable)
function parseColombianPrice(price) {
    if (!price) return 0;
    let cleanPrice = String(price).replace(/[$]/g, '').replace(/\./g, '').replace(/,/g, '.');
    return parseFloat(cleanPrice) || 0;
}

// 🚀 NUEVAS FUNCIONALIDADES FASE 4 - PRODUCT CARD AVANZADO

// ❤️ SISTEMA DE FAVORITOS
let favorites = JSON.parse(localStorage.getItem('ingenioFavorites')) || [];

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('❌ Producto removido de favoritos');
    } else {
        favorites.push(productId);
        showToast('❤️ Producto agregado a favoritos');
    }
    localStorage.setItem('ingenioFavorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        const productId = btn.dataset.productId;
        const isFavorite = favorites.includes(productId);
        
        // Actualizar icono con colores más visibles
        btn.innerHTML = isFavorite ? '❤️' : '🤍';
        btn.classList.toggle('active', isFavorite);
        
        // Forzar actualización de estilo
        if (isFavorite) {
            btn.style.color = '#e74c3c';
            btn.style.transform = 'scale(1.1)';
        } else {
            btn.style.color = '#bdc3c7';
            btn.style.transform = 'scale(1)';
        }
    });
}

function generateFavoriteButton(product) {
    if (!ENHANCEMENT_CONFIG.favoriteSystem) return '';
    
    const isFavorite = favorites.includes(product.id_del_producto);
    return `
        <button class="btn-favorite ${isFavorite ? 'active' : ''}" 
                data-product-id="${product.id_del_producto}"
                onclick="toggleFavorite('${product.id_del_producto}')"
                aria-label="Agregar a favoritos">
            ${isFavorite ? '❤️' : '🤍'}
        </button>
    `;
}

// 📊 SISTEMA DE PRUEBA SOCIAL MEJORADO (350+ SIEMPRE)
function generateSocialProof(product) {
    if (!ENHANCEMENT_CONFIG.socialProof) return '';
    
    const productId = parseInt(product.id_del_producto) || 0;
    // TODOS los productos tendrán 350+ visualizaciones (gancho de ventas)
    const baseViews = 350 + Math.floor(productId * 2.3) + Math.floor(Math.random() * 200); // 350-800+ vistas
    const todayViews = Math.floor(Math.random() * 15) + 8; // Vistas de hoy (8-23)
    
    return `
        <div class="social-proof">
            <span class="views-indicator">
                👁️ ${baseViews + todayViews} personas vieron esto
            </span>
        </div>
    `;
}

// 🏷️ ETIQUETAS INTELIGENTES DINÁMICAS (TODOS LOS PRODUCTOS TIENEN ETIQUETAS)
function generateSmartLabels(product) {
    if (!ENHANCEMENT_CONFIG.smartLabels) return '';
    
    const labels = [];
    const productId = parseInt(product.id_del_producto) || 0;
    const price = parseColombianPrice(product.precio_final);
    const productName = product.nombre_producto.toLowerCase();
    
    // Análisis inteligente GARANTIZANDO que todos tengan etiquetas
    
    // 1. ETIQUETAS POR PRECIO
    if (price > 0 && price < 50000) {
        labels.push({ text: 'Económico', icon: '💰', class: 'label-economic' });
    } else if (price > 200000) {
        labels.push({ text: 'Premium', icon: '⭐', class: 'label-premium' });
    } else if (price >= 50000 && price <= 200000) {
        labels.push({ text: 'Calidad-Precio', icon: '🎯', class: 'label-value' });
    }
    
    // 2. ETIQUETAS POR TECNOLOGÍA
    if (productName.includes('bluetooth') || productName.includes('inalámbrico')) {
        labels.push({ text: 'Inalámbrico', icon: '📶', class: 'label-wireless' });
    }
    
    if (productName.includes('solar') || productName.includes('batería') || productName.includes('recargable')) {
        labels.push({ text: 'Eco-friendly', icon: '🌱', class: 'label-eco' });
    }
    
    if (productName.includes('led') || productName.includes('luz')) {
        labels.push({ text: 'LED', icon: '💡', class: 'label-led' });
    }
    
    // 3. ETIQUETAS POR VENTAS
    if (productId % 7 === 0) {
        labels.push({ text: 'Más vendido', icon: '🔥', class: 'label-bestseller' });
    }
    
    if (productId % 12 === 0) {
        labels.push({ text: 'Tendencia', icon: '📈', class: 'label-trending' });
    }
    
    // 4. GARANTIZAR QUE TODOS TENGAN AL MENOS UNA ETIQUETA
    if (labels.length === 0) {
        // Etiquetas de respaldo basadas en ID para que todos tengan algo
        const fallbackLabels = [
            { text: 'Recomendado', icon: '👍', class: 'label-recommended' },
            { text: 'Calidad', icon: '⚡', class: 'label-quality' },
            { text: 'Innovador', icon: '🚀', class: 'label-innovative' },
            { text: 'Funcional', icon: '🛠️', class: 'label-functional' },
            { text: 'Versátil', icon: '🎲', class: 'label-versatile' }
        ];
        labels.push(fallbackLabels[productId % fallbackLabels.length]);
    }
    
    // Mostrar máximo 2 etiquetas para no sobrecargar
    return `
        <div class="smart-labels">
            ${labels.slice(0, 2).map(label => `
                <span class="smart-label ${label.class}">
                    ${label.icon} ${label.text}
                </span>
            `).join('')}
        </div>
    `;
}

// 🔍 VISTA PREVIA RÁPIDA - DESACTIVADA (CAUSA OVERLAY NEGRO)
function generateQuickPreview(product) {
    // Función desactivada para mejorar UX y rendimiento
    return '';
}

function selectProduct(productId) {
    console.log("🎯 Producto seleccionado ID:", productId);
    
    // Buscar el producto en allProducts
    const product = allProducts.find(p => p.id_del_producto == productId);
    
    if (!product) {
        console.error("❌ Producto no encontrado:", productId);
        alert('Producto no encontrado');
        return;
    }
    
    console.log("✅ Producto encontrado:", product.nombre || product.nombre_producto);
    
    // Ocultar sugerencias
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
    
    // Limpiar el campo de búsqueda
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.value = '';
    }
    
    // Intentar abrir el modal del producto
    if (typeof openProductModal === 'function') {
        console.log("🔓 Abriendo modal del producto...");
        openProductModal(product);
    } else {
        console.log("⚠️ Función openProductModal no disponible, buscando alternativa...");
        
        // Buscar el modal manualmente
        const modal = document.getElementById('product-modal');
        if (modal && typeof window.openProductModal === 'function') {
            window.openProductModal(product);
        } else {
            // Fallback: mostrar información básica
            alert(`Producto: ${product.nombre || product.nombre_producto}\nPrecio: $${formatPrice(product.precio_final || product.precio)}\nCategoría: ${product.categoria_principal || ''}`);
        }
    }
}

// Exponer funciones globalmente
window.setupWorkingSearch = setupWorkingSearch;
window.selectProduct = selectProduct;

document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = '+573185801243';

    // --- FUNCIONES DE UTILIDAD Y COMPONENTES REUTILIZABLES ---

    /**
     * Muestra una notificación temporal (toast) en la esquina de la pantalla.
     * @param {string} message El mensaje a mostrar.
     * @param {string} type 'success' o 'error' para el estilo del toast.
     */
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3500);
    }

    /**
     * MEJORA: Crea el HTML del botón "Agregar al Carrito". 
     * Esta función evita repetir código en la tarjeta del producto y en el modal.
     * @param {object} product El objeto del producto.
     * @returns {string} El string HTML del botón.
     */
    function createAddToCartButtonHTML(product) {
        const isOutOfStock = product.stock <= 0;
        return `
            <button class="add-to-cart-btn" data-id="${product.id_del_producto}" ${isOutOfStock ? 'disabled' : ''}>
                ${isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
            </button>
        `;
    }

    // --- LÓGICA PRINCIPAL DE LA APLICACIÓN ---

    /**
     * Función principal que arranca toda la aplicación.
     * Es asíncrona para poder esperar a que los productos se carguen desde el JSON.
     */
    async function initializeApp() {
        try {
            console.log("Iniciando carga de productos.json...");
            const response = await fetch('productos.json');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            console.log("Archivo productos.json encontrado, procesando JSON...");
            
            allProducts = await response.json();
            console.log(`Productos cargados correctamente. Total: ${allProducts.length}`);
            
            // Exponer allProducts globalmente para debugging
            window.allProducts = allProducts;
            
            // Validación adicional
            if (!allProducts || allProducts.length === 0) {
                throw new Error("Array de productos está vacío");
            }
            
            // Una vez cargados los productos, construimos la página.
            console.log("Generando header...");
            generateHeader(allProducts);
            console.log("Generando footer...");
            generateFooter(allProducts); 
            console.log("Configurando event listeners...");
            setupEventListeners();
            
            // Configurar buscador funcional inmediatamente
            console.log("🔍 Configurando buscador funcional...");
            setTimeout(() => {
                setupWorkingSearch();
            }, 200);
            
            console.log("🛒 Inicializando carrito mejorado...");
            updateCartUI();
            
            // ✅ Asegurar que las funciones del carrito estén disponibles globalmente
            console.log("🔧 Exponiendo funciones del carrito globalmente...");
            window.addToCart = addToCart;
            window.removeFromCart = removeFromCart;
            window.changeQuantity = changeQuantity;
            window.updateCartUI = updateCartUI;
            window.generateWhatsAppMessage = generateWhatsAppMessage;
            console.log("✅ Carrito mejorado completamente inicializado");
            
            // ✅ MOSTRAR MENSAJE DE ÉXITO DE LAS MEJORAS
            setTimeout(() => {
                showToast('🛒 ¡Carrito mejorado cargado! Control de cantidades, diseño profesional y checkout WhatsApp optimizado.', 'success');
            }, 1000);
            console.log("Enrutando página según URL...");
            routePage(allProducts);
            
            console.log("Inicialización completa.");

        } catch (error) {
            console.error("Error al inicializar la aplicación:", error);
            
            // Fallback: intentar cargar productos nuevamente
            console.log("🔄 Intentando fallback de carga de productos...");
            setTimeout(async () => {
                try {
                    const fallbackResponse = await fetch('./productos.json');
                    if (fallbackResponse.ok) {
                        allProducts = await fallbackResponse.json();
                        window.allProducts = allProducts;
                        console.log("✅ Productos cargados en fallback:", allProducts.length);
                        
                        // Regenerar header si es necesario
                        if (allProducts.length > 0) {
                            generateHeader(allProducts);
                            setupEventListeners();
                            setupWorkingSearch();
                        }
                    } else {
                        throw new Error("Fallback fetch failed");
                    }
                } catch (fallbackError) {
                    console.error("❌ Fallback también falló:", fallbackError);
                    // Mostrar mensaje de error original
                    showErrorMessage(error);
                }
            }, 1000);
        }
    }
    
    function showErrorMessage(error) {
        // Mostrar un mensaje de error más visible en la página
        const mainContainer = document.querySelector('main') || document.body;
        const errorDiv = document.createElement('div');
        errorDiv.style.padding = '20px';
        errorDiv.style.margin = '20px auto';
        errorDiv.style.maxWidth = '600px';
        errorDiv.style.backgroundColor = '#ffdddd';
        errorDiv.style.border = '1px solid #ff0000';
        errorDiv.style.borderRadius = '5px';
        errorDiv.innerHTML = `
            <h2>Error al cargar la página</h2>
            <p>Lo sentimos, ha ocurrido un error al cargar los productos:</p>
            <pre style="background: #f8f8f8; padding: 10px; overflow: auto;">${error.message}</pre>
            <p>Por favor, intenta refrescar la página o contacta con soporte si el problema persiste.</p>
            <button onclick="window.location.reload()" style="padding: 8px 16px; background: #00b0fa; color: white; border: none; border-radius: 4px; cursor: pointer;">Refrescar página</button>
        `;
        mainContainer.prepend(errorDiv);
        
        showToast('Error al cargar los productos. Intenta refrescar la página.', 'error');
    }

    // Configurar buscador automáticamente cuando se carguen los productos
    if (allProducts && allProducts.length > 0) {
        setupWorkingSearch();
    }

    /**
     * "Enrutador" simple: decide qué función ejecutar según la página en la que estemos.
     * @param {Array} products El listado de todos los productos.
     */
    function routePage(products) {
        const path = window.location.pathname.split("/").pop() || 'index.html';
        switch (path) {
            case 'index.html':
                displayHomeCategories(products, 'home-catalog-container');
                displayRandomHomeProducts(products, 'home-products-grid'); // NUEVO: muestra 16 productos en home
                break;
            case 'catalogo.html':
                handleCatalogPage(products);
                break;
            case 'todos-los-productos.html':
                handleAllProductsPage(products);
                break;
        }
    }
    
    // --- FUNCIONES PARA GENERAR CONTENIDO DINÁMICO ---
    
    /**
     * Construye el HTML del header dinámicamente.
     * NOTA: Usar .innerHTML es práctico aquí, pero siempre asegúrate de que el contenido 
     * (como 'cat' de categorías) provenga de una fuente confiable (tu JSON) para evitar riesgos de seguridad (XSS).
     * @param {Array} products El listado de todos los productos.
     */
    function generateHeader(products) {
        const header = document.querySelector('.site-header');
        if (!header) return;
        const categories = [...new Set(products.map(p => p.categoria_principal).filter(Boolean))];
        const categoryLinks = categories.map(cat => `<a href="catalogo.html?categoria=${encodeURIComponent(cat)}">${cat}</a>`).join('');

        // LOGO REAL + TEXTO "Ingenio Red" EN AZUL Y NEGRITA
        const logoHtml = `<a href="index.html" class="logo-container" aria-label="Ir al inicio" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
            <img src="assets/icons/logo.svg" alt="Logo Ingenio Red" style="max-height:50px;display:block;" />
            <span style="color:#00b0fa;font-weight:800;font-size:1.6rem;letter-spacing:0.5px;">Ingenio Red</span>
        </a>`;

        header.innerHTML = `
            ${logoHtml}
            <nav class="main-nav">
                <a href="index.html">Inicio</a>
                <div class="dropdown"><button class="dropbtn">Catálogo</button><div class="dropdown-content">${categoryLinks}</div></div>
                <a href="todos-los-productos.html">Todos los Productos</a>
                <a href="contacto.html">Contacto</a>
            </nav>
            <div class="header-right">
                <div class="search-container">
                    <input type="text" class="search-bar" placeholder="Buscar producto...">
                    <div id="search-suggestions"></div>
                </div>
                <div class="cart-icon" title="Ver mi Carrito">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cart-svg">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span id="cart-count">0</span>
                </div>
                <button class="hamburger-menu" aria-label="Abrir menú de navegación" aria-expanded="false">
                    <span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span>
                </button>
            </div>`;
    }

    function generateFooter(products) {
        const footer = document.querySelector('.site-footer');
        if (!footer) return;
        const categories = [...new Set(products.map(p => p.categoria_principal).filter(Boolean))];
        const categoryLinks = categories.map(cat => `<li><a href="catalogo.html?categoria=${encodeURIComponent(cat)}">${cat}</a></li>`).join('');
        const socialIcons = [
            { href: 'https://facebook.com', icon: 'facebook.svg', label: 'Facebook' },
            { href: 'https://instagram.com', icon: 'instagram.svg', label: 'Instagram' },
            { href: 'https://youtube.com', icon: 'youtube.svg', label: 'YouTube' },
            { href: 'https://linkedin.com', icon: 'linkedin.svg', label: 'LinkedIn' },
            { href: 'https://wa.me/573185801243', icon: 'whatsapp.svg', label: 'WhatsApp' }
        ];
        // Sección de confianza
        const confianzaHTML = `
        <div class="footer-confianza" aria-label="Confianza y garantía">
            <span><img src="assets/icons/whatsapp-business-svgrepo-com.svg" alt="Atención personalizada" class="footer-icon"> Atención personalizada</span>
            <span><img src="assets/icons/ubicacion.svg" alt="Envíos a todo Colombia" class="footer-icon"> Envíos a todo Colombia</span>
            <span><img src="assets/icons/garantia.svg" alt="Calidad garantizada" class="footer-icon"> Calidad 100% garantizada</span>
        </div>`;
        footer.outerHTML = `<footer class="site-footer" role="contentinfo" aria-labelledby="footer-brand footer-nav footer-catalog footer-contact">
        ${confianzaHTML}
        <div class="footer-container">
            <div class="footer-column" id="footer-brand">
                <div style="display:flex;align-items:center;gap:22px;margin-bottom:10px;">
                    <a href="index.html" aria-label="Ir al inicio" style="display:flex;align-items:center;gap:22px;text-decoration:none;">
                        <img src="assets/icons/logo.svg" alt="Logo Ingenio Red" style="width:80px;height:80px;display:block;" class="footer-logo-anim" />
                        <span style="color:#00b0fa;font-weight:900;font-size:2rem;letter-spacing:0.5px;line-height:1;white-space:nowrap;">Ingenio Red</span>
                    </a>
                </div>
                <span style="display:block;margin-top:6px;color:#ffd600;font-size:1.05rem;font-weight:800;letter-spacing:1px;text-shadow:1px 2px 6px #00000080,0 1px 0 #fff200;line-height:1.1;">¡Energía para Mover el Planeta!</span>
            </div>
            <div class="footer-column" id="footer-nav">
              <h4>Enlaces Rápidos</h4>
              <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="todos-los-productos.html">Todos los Productos</a></li>
                <li><a href="contacto.html">Contacto</a></li>
                <li><a href="contacto.html#faq">Preguntas Frecuentes</a></li>
                <li><a href="garantia.html">Garantía</a></li>
                <li>
                  <button id="footer-darkmode-btn" class="footer-darkmode-btn" aria-label="Alternar modo oscuro" title="Modo oscuro/claro">
                    <span class="footer-darkmode-icon" aria-hidden="true"></span>
                    <span class="footer-darkmode-text">Modo oscuro</span>
                  </button>
                </li>
              </ul>
            </div>
            <div class="footer-column" id="footer-catalog"><h4>Catálogo</h4><ul>${categoryLinks}</ul></div>
            <div class="footer-column" id="footer-contact">
                <h4>Contacto</h4>
                <address>
                    <p><img src="assets/icons/ubicacion.svg" alt="Ubicación" class="footer-icon"> <strong>Ubicación:</strong> Bogotá, Colombia</p>
                    <p><img src="assets/icons/whatsapp-business-svgrepo-com.svg" alt="WhatsApp" class="footer-icon whatsapp"> <strong>WhatsApp:</strong> <a href="https://api.whatsapp.com/send?phone=573185801243" target="_blank" rel="noopener noreferrer">+57 318 580 1243</a></p>
                    <p><img src="assets/icons/mail.svg" alt="Correo electrónico" class="footer-icon"> <strong>Email:</strong> <a href="mailto:servicioalcliente@ingeniored.org">servicioalcliente@ingeniored.org</a></p>
                    <p><img src="assets/icons/horario.svg" alt="Horario de atención" class="footer-icon" aria-label="Horario de atención"> <strong>Horario:</strong> <span>De lunes a sábado de 8:00 a.m. a 6:00 p.m.</span></p>
                    <div class="social-icons">${socialIcons.map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}"><img src="assets/icons/${s.icon}" alt="${s.label}"></a>`).join('')}</div>
                </address>
            </div>
        </div>
        <div class="footer-bottom">&copy; <span id="footer-year"></span> Ingenio Red. Todos los derechos reservados.<br>
            <a href="privacidad.html" style="color:#ccc;font-size:0.98rem;text-decoration:underline;display:inline-block;margin-top:8px;" rel="noopener noreferrer">Política de Privacidad y Cookies</a>
        </div>
        <div class="footer-legal">
            Precios sujetos a cambios sin previo aviso. Imágenes de referencia.
        </div>
    </footer>`;
        // Año automático
        const yearSpan = document.getElementById('footer-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }
    
    // --- FUNCIONES PARA RENDERIZAR VISTAS DE PÁGINA ---

    function handleCatalogPage(products) {
        const params = new URLSearchParams(window.location.search);
        const category = decodeURIComponent(params.get('categoria') || '');
        const titleEl = document.getElementById('category-title');
        if (titleEl) {
            titleEl.textContent = category || "Categoría no encontrada";
            document.title = `${category} - Ingenio Red`;
            const filteredProducts = products.filter(p => p.categoria_principal === category);
            displayProductsInGrid(filteredProducts, 'product-catalog-grid');
        }
    }

    function handleAllProductsPage(products) {
    // Mezclar productos aleatoriamente usando el algoritmo de Fisher-Yates
    const shuffledProducts = products.slice();
    for (let i = shuffledProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
    }
    let currentPage = 1;
    const productsPerPage = 24;
    const paginationContainer = document.getElementById('pagination-controls');
    const renderPage = (page) => {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        displayProductsInGrid(shuffledProducts.slice(start, end), 'all-products-grid');
    };
    const setupPagination = () => {
        if (!paginationContainer) return;
        const pageCount = Math.ceil(shuffledProducts.length / productsPerPage);
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button'); btn.innerText = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                currentPage = i;
                renderPage(currentPage);
                document.querySelector('.pagination .active')?.classList.remove('active');
                btn.classList.add('active');
            });
            paginationContainer.appendChild(btn);
        }
    };
    renderPage(currentPage);
    setupPagination();
    }
    
    /**
     * MODIFICAR LA HOME PARA USAR LAS IMÁGENES DE CATEGORÍAS
     */
    async function displayHomeCategories(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '<h2>Categorías Destacadas</h2>';
        const grid = document.createElement('div');
        grid.className = 'home-categories-grid';
        // Cargar imágenes desde el JSON externo
        const imagenesCategorias = await cargarImagenesCategoriasJSON();
        const categorias = [...new Set(products.map(p => p.categoria_principal).filter(Boolean))];
        categorias.forEach(category => {
            // Buscar la imagen correspondiente en el JSON
            const imgObj = imagenesCategorias.find(img => img.categoria.trim().toLowerCase() === category.trim().toLowerCase());
            const imgUrl = imgObj ? imgObj.url_imagen_cloudinary : 'assets/icons/logo.svg';
            grid.innerHTML += `<a href="catalogo.html?categoria=${encodeURIComponent(category)}" class="home-category-card">
                <img src="${imgUrl}" alt="Categoría ${category}" loading="lazy">
                <div class="category-name">${category}</div>
            </a>`;
        });
        container.appendChild(grid);
    }

    /**
     * Muestra los primeros 16 productos en la sección de inicio "Todos los Productos".
     * @param {Array} products El listado de todos los productos.
     * @param {string} containerId El id del contenedor donde se insertan las cards.
     */
    function displayHomeAllProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        // Selecciona los primeros 16 productos activos
        const destacados = products.filter(p => p.estado === 'activo').slice(0, 16);
        container.innerHTML = destacados.map(createProductCardHTML).join('');
    }

    /**
     * Muestra 16 productos aleatorios en la grilla de la home y los cambia cada 11 segundos.
     * @param {Array} products El listado de todos los productos.
     * @param {string} containerId El id del contenedor donde se insertan las cards.
     */
    function displayRandomHomeProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        let timer = null;
        function renderRandomProducts() {
            // Filtrar solo productos activos
            const activos = products.filter(p => p.estado === 'activo');
            // Mezclar aleatoriamente
            const mezclados = activos.sort(() => Math.random() - 0.5);
            // Tomar 16 productos
            const seleccionados = mezclados.slice(0, 16);
            container.innerHTML = seleccionados.map(createProductCardHTML).join('');
        }
        renderRandomProducts();
        if (timer) clearInterval(timer);
        timer = setInterval(renderRandomProducts, 11000);
    }

    function displayProductsInGrid(productsToDisplay, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (productsToDisplay.length === 0) {
            container.innerHTML = `<p class="empty-state-message">No se encontraron productos.</p>`;
            return;
        }
        container.innerHTML = productsToDisplay.map(createProductCardHTML).join('');
    }

    function createProductCardHTML(product) {
        if (!ENHANCEMENT_CONFIG.enhancedCards) {
            // 💰 VERSIÓN BÁSICA CON PRECIO CORREGIDO
            let precio = '';
            if (product.precio_oferta && product.precio_oferta !== '') {
                precio = product.precio_oferta;
            } else if (product.precio_final && product.precio_final !== '') {
                const precioParsed = parseColombianPrice(product.precio_final);
                precio = formatPrice(precioParsed);
            } else if (product.precio && product.precio !== '') {
                precio = product.precio;
            } else {
                precio = 'Consultar precio';
            }
            
            return `
                <div class="product-card">
                    ${product.stock <= 0 ? '<div class="out-of-stock-overlay">Agotado</div>' : ''}
                    <div class="img-container" data-id="${product.id_del_producto}" tabindex="0" role="button" aria-label="Ver detalles de ${product.nombre_producto}">
                        <img src="${product.imagen_principal}" alt="${product.texto_alt_imagen}">
                    </div>
                    <div class="product-details">
                        <h4>${product.nombre_producto}</h4>
                        <p class="price">${precio}</p>
                        ${createAddToCartButtonHTML(product)}
                    </div>
                </div>`;
        }

        // 🚀 VERSIÓN MEJORADA - FASE 4 OPTIMIZADA (SIN OVERLAYS)
        const productSchema = ENHANCEMENT_CONFIG.schemaMarkup ? generateProductSchema(product) : '';
        const badges = generateProductBadges(product);
        const priceComparison = generatePriceComparison(product); // Ya incluye urgencia
        const rating = generateProductRating(product);
        const conversionBoosts = generateConversionBoosts(product);
        const advancedCTA = createAdvancedCTAButtons(product);
        
        // 🆕 NUEVAS FUNCIONALIDADES FASE 4 (OPTIMIZADAS)
        const favoriteButton = generateFavoriteButton(product);
        const socialProof = generateSocialProof(product);
        const smartLabels = generateSmartLabels(product);
        // quickPreview removido para mejor UX
        
        return `
            <div class="product-card enhanced advanced ultimate super" ${productSchema}>
                ${product.stock <= 0 ? '<div class="out-of-stock-overlay">Agotado</div>' : ''}
                ${badges}
                ${favoriteButton}
                <div class="img-container" data-id="${product.id_del_producto}" tabindex="0" role="button" aria-label="Ver detalles de ${product.nombre_producto}">
                    <img src="${product.imagen_principal}" alt="${product.texto_alt_imagen}" loading="lazy">
                </div>
                <div class="product-details">
                    <h4 class="product-title">${product.nombre_producto}</h4>
                    ${smartLabels}
                    ${rating}
                    ${socialProof}
                    ${priceComparison}
                    <div class="pre-cta-section">
                        ${conversionBoosts}
                    </div>
                    ${advancedCTA}
                </div>
            </div>`;
    }

    // 🏷️ FUNCIÓN DE SCHEMA MARKUP PARA SEO - FASE 1
    function generateProductSchema(product) {
        if (!ENHANCEMENT_CONFIG.schemaMarkup) return '';
        
        const price = parseFloat(String(product.precio_final).replace(/[^0-9.]/g, '')) || 0;
        const availability = product.stock > 0 ? 'InStock' : 'OutOfStock';
        
        const schema = {
            "@type": "Product",
            "name": product.nombre_producto,
            "image": product.imagen_principal,
            "description": product.texto_alt_imagen || product.nombre_producto,
            "sku": product.id_del_producto,
            "brand": {
                "@type": "Brand",
                "name": "Ingenio Red"
            },
            "offers": {
                "@type": "Offer",
                "url": `${window.location.origin}#producto-${product.id_del_producto}`,
                "priceCurrency": "COP",
                "price": price,
                "availability": `https://schema.org/${availability}`,
                "seller": {
                    "@type": "Organization",
                    "name": "Ingenio Red"
                }
            }
        };
        
        // Si hay precio original, agregar precio anterior
        if (product.precio_original) {
            const originalPrice = parseFloat(product.precio_original.replace(/[^0-9.]/g, ''));
            if (originalPrice > price) {
                schema.offers.priceValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            }
        }
        
        return `data-schema='${JSON.stringify(schema)}'`;
    }

    /**
     * Configura todos los event listeners de la aplicación.
     * Usa la técnica de "delegación de eventos" en document.body para mayor eficiencia.
     * Esto significa que un solo listener gestiona los clics de muchos elementos.
     */
    function setupEventListeners() {
        // Listener para el menú de hamburguesa
        const hamburger = document.querySelector('.hamburger-menu');
        const header = document.querySelector('.site-header');
        if(hamburger && header) {
            hamburger.addEventListener('click', () => {
                const isOpening = !header.classList.contains('nav-open');
                header.classList.toggle('nav-open');
                document.body.style.overflow = isOpening ? 'hidden' : '';
                hamburger.setAttribute('aria-expanded', isOpening);
            });
        }
    
        // Listener para el dropdown del catálogo en desktop
        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            const dropbtn = dropdown.querySelector('.dropbtn');
            dropbtn.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdown.classList.toggle('active');
            });
        }
        window.addEventListener('click', () => {
            document.querySelector('.dropdown.active')?.classList.remove('active');
        });

        // Listener principal para clics en toda la página (Delegación de Eventos)
        document.body.addEventListener('click', e => {
            if (e.target.closest('.img-container')) {
                const id = e.target.closest('.img-container').dataset.id;
                const product = allProducts.find(p => p.id_del_producto == id);
                if (product) openProductModal(product);
            } else if (e.target.matches('.add-to-cart-btn')) {
                e.preventDefault();
                addToCart(e.target.dataset.id);
            } else if (e.target.closest('.cart-icon')) {
                openCartModal();
            } else if (e.target.matches('.close-button')) {
                closeAllModals();
            } else if (e.target.id === 'send-whatsapp-btn') {
                console.log('🔥 Botón WhatsApp clickeado');
                e.preventDefault(); // Evitar comportamiento por defecto
                generateWhatsAppMessage();
            } else if (e.target.classList.contains('modal')) {
                closeAllModals();
            }
        });

        // ✅ MEJORA: Listener para botones del carrito (eliminar, cantidad, etc.)
        const cartItemsContainer = document.getElementById('cart-items-container');
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                // Eliminar producto del carrito
                if (e.target.classList.contains('remove-from-cart-btn') || e.target.closest('.remove-item-btn')) {
                    const btn = e.target.classList.contains('remove-from-cart-btn') ? e.target : e.target.closest('.remove-item-btn');
                    removeFromCart(btn.dataset.id);
                }
                
                // Disminuir cantidad
                if (e.target.classList.contains('decrease-qty-btn') || e.target.closest('.decrease-qty-btn')) {
                    const btn = e.target.classList.contains('decrease-qty-btn') ? e.target : e.target.closest('.decrease-qty-btn');
                    changeQuantity(btn.dataset.id, -1);
                }
                
                // Aumentar cantidad
                if (e.target.classList.contains('increase-qty-btn') || e.target.closest('.increase-qty-btn')) {
                    const btn = e.target.classList.contains('increase-qty-btn') ? e.target : e.target.closest('.increase-qty-btn');
                    changeQuantity(btn.dataset.id, 1);
                }
            });
        }

        // ✅ NUEVA FUNCIONALIDAD: Validación en tiempo real del formulario
        const customerPhone = document.getElementById('customer-phone');
        if (customerPhone) {
            customerPhone.addEventListener('input', function(e) {
                formatPhoneNumber(e.target);
                clearErrorHighlights();
            });
        }

        // Limpiar errores al escribir en cualquier campo
        const formInputs = document.querySelectorAll('#customer-name, #customer-location, #customer-email, #customer-phone');
        formInputs.forEach(input => {
            if (input) {
                input.addEventListener('input', clearErrorHighlights);
            }
        });

        // Funcionalidad del buscador se configura por separado con delay
        console.log("📝 setupEventListeners completado");
    }

    /**
     * Configura toda la funcionalidad del buscador con búsqueda en tiempo real
     */
    function setupSearchFunctionality() {
        console.log("🔍 setupSearchFunctionality iniciado");
        console.log("🔍 Total productos disponibles:", allProducts ? allProducts.length : 0);
        
        // Verificar que los productos estén cargados
        if (!allProducts || allProducts.length === 0) {
            console.error("🚨 Productos no disponibles, reintentando en 500ms...");
            setTimeout(setupSearchFunctionality, 500);
            return;
        }
        
        const searchBar = document.querySelector('.search-bar');
        const searchSuggestions = document.getElementById('search-suggestions');
        
        console.log("🔍 Elementos encontrados:", {
            searchBar: !!searchBar,
            searchSuggestions: !!searchSuggestions
        });
        
        if (!searchBar || !searchSuggestions) {
            console.error("🚨 Elementos del buscador no encontrados en el DOM, reintentando...");
            setTimeout(setupSearchFunctionality, 200);
            return;
        }

        console.log("🔍 ✅ Configurando event listeners del buscador...");

        let searchTimeout;
        let searchResults = [];
        
        // Búsqueda en tiempo real mientras el usuario escribe
        searchBar.addEventListener('input', (e) => {
            console.log("🔍 Input detectado:", e.target.value);
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                console.log("🔍 Query muy corto, ocultando sugerencias");
                hideSearchSuggestions();
                return;
            }
            
            // Debounce para optimizar rendimiento
            searchTimeout = setTimeout(() => {
                console.log("🔍 Realizando búsqueda para:", query);
                performSearch(query);
            }, 300);
        });

        // Navegación con teclado
        searchBar.addEventListener('keydown', (e) => {
            const suggestions = searchSuggestions.querySelectorAll('.search-suggestion-item');
            let currentIndex = Array.from(suggestions).findIndex(s => s.classList.contains('active'));
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = Math.min(currentIndex + 1, suggestions.length - 1);
                updateActiveSuggestion(suggestions, currentIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = Math.max(currentIndex - 1, -1);
                updateActiveSuggestion(suggestions, currentIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const activeSuggestion = searchSuggestions.querySelector('.search-suggestion-item.active');
                if (activeSuggestion) {
                    selectSuggestion(activeSuggestion);
                } else if (searchResults.length > 0) {
                    selectSuggestion(suggestions[0]);
                }
            } else if (e.key === 'Escape') {
                hideSearchSuggestions();
                searchBar.blur();
            }
        });

        // Ocultar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                hideSearchSuggestions();
            }
        });

        // Mostrar sugerencias al enfocar si hay texto
        searchBar.addEventListener('focus', () => {
            if (searchBar.value.trim().length >= 2) {
                performSearch(searchBar.value.trim());
            }
        });
        
        console.log("🔍 ✅ Buscador configurado exitosamente!");
    }

    /**
     * Realiza la búsqueda inteligente en productos
     */
    function performSearch(query) {
        console.log("🔍 performSearch iniciado con query:", query);
        console.log("🔍 allProducts disponible:", !!allProducts, "Total:", allProducts ? allProducts.length : 0);
        
        if (!allProducts || allProducts.length === 0) {
            console.error("🚨 No hay productos disponibles para buscar");
            return;
        }
        
        const normalizedQuery = normalizeText(query);
        console.log("🔍 Query normalizado:", normalizedQuery);
        searchResults = [];
        
        allProducts.forEach(product => {
            const score = calculateSearchScore(product, normalizedQuery);
            if (score > 0) {
                searchResults.push({ product, score });
            }
        });
        
        console.log("🔍 Resultados encontrados:", searchResults.length);
        
        // Ordenar por relevancia (score descendente)
        searchResults.sort((a, b) => b.score - a.score);
        
        // Limitar a 8 resultados máximo
        searchResults = searchResults.slice(0, 8);
        
        console.log("🔍 Resultados después del límite:", searchResults.length);
        displaySearchSuggestions(searchResults, query);
    }

    /**
     * Calcula la puntuación de relevancia para un producto
     */
    function calculateSearchScore(product, query) {
        let score = 0;
        const queryWords = query.split(' ').filter(word => word.length > 1);
        
        // Normalizar textos del producto
        const nombre = normalizeText(product.nombre || '');
        const categoria = normalizeText(product.categoria_principal || '');
        const sku = normalizeText(product.sku || '');
        const descripcion = normalizeText(product.descripcion || '');
        
        queryWords.forEach(word => {
            // Coincidencia exacta en nombre (máxima prioridad)
            if (nombre.includes(word)) {
                if (nombre.startsWith(word)) score += 100;
                else score += 50;
            }
            
            // Coincidencia en SKU (alta prioridad)
            if (sku.includes(word)) {
                score += 80;
            }
            
            // Coincidencia en categoría
            if (categoria.includes(word)) {
                score += 30;
            }
            
            // Coincidencia en descripción
            if (descripcion.includes(word)) {
                score += 20;
            }
            
            // Búsqueda difusa (partial matches)
            if (nombre.indexOf(word.substring(0, Math.max(3, word.length - 1))) !== -1) {
                score += 15;
            }
        });
        
        return score;
    }

    /**
     * Normaliza texto para búsqueda (quita acentos, convierte a minúsculas)
     */
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * Muestra las sugerencias de búsqueda
     */
    function displaySearchSuggestions(results, originalQuery) {
        console.log("🔍 displaySearchSuggestions iniciado con", results.length, "resultados");
        const searchSuggestions = document.getElementById('search-suggestions');
        
        if (!searchSuggestions) {
            console.error("🚨 search-suggestions element no encontrado");
            return;
        }
        
        if (results.length === 0) {
            console.log("🔍 Sin resultados, mostrando mensaje");
            searchSuggestions.innerHTML = `
                <div class="search-no-results">
                    <span>No se encontraron productos para "${originalQuery}"</span>
                    <small>Intenta con términos más generales</small>
                </div>`;
            searchSuggestions.style.display = 'block';
            return;
        }
        
        const suggestionsHTML = results.map(({ product }, index) => {
            const imageUrl = product.imagenes && product.imagenes[0] 
                ? product.imagenes[0] 
                : 'https://via.placeholder.com/60x60?text=IMG';
                
            const price = product.precio_oferta || product.precio;
            const priceText = price ? `$${parseInt(price).toLocaleString()}` : 'Consultar precio';
            
            return `
                <div class="search-suggestion-item ${index === 0 ? 'active' : ''}" 
                     data-product-id="${product.id_del_producto}">
                    <img src="${imageUrl}" alt="${product.nombre}" class="suggestion-image">
                    <div class="suggestion-content">
                        <div class="suggestion-name">${highlightSearchTerms(product.nombre, originalQuery)}</div>
                        <div class="suggestion-category">${product.categoria_principal || ''}</div>
                        <div class="suggestion-price">${priceText}</div>
                    </div>
                    <div class="suggestion-action">Ver</div>
                </div>`;
        }).join('');
        
        searchSuggestions.innerHTML = suggestionsHTML;
        searchSuggestions.style.display = 'block';
        
        // Agregar event listeners a las sugerencias
        searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => selectSuggestion(item));
            item.addEventListener('mouseenter', () => {
                searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(s => s.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    /**
     * Resalta los términos de búsqueda en el texto
     */
    function highlightSearchTerms(text, query) {
        if (!query) return text;
        
        const queryWords = query.split(' ').filter(word => word.length > 1);
        let highlightedText = text;
        
        queryWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }

    /**
     * Actualiza la sugerencia activa para navegación con teclado
     */
    function updateActiveSuggestion(suggestions, index) {
        suggestions.forEach(s => s.classList.remove('active'));
        if (index >= 0 && index < suggestions.length) {
            suggestions[index].classList.add('active');
            suggestions[index].scrollIntoView({ block: 'nearest' });
        }
    }

    /**
     * Selecciona una sugerencia y abre el modal del producto
     */
    function selectSuggestion(suggestionElement) {
        const productId = suggestionElement.dataset.productId;
        const product = allProducts.find(p => p.id_del_producto == productId);
        
        if (product) {
            hideSearchSuggestions();
            document.querySelector('.search-bar').value = product.nombre;
            openProductModal(product);
        }
    }

    /**
     * Oculta las sugerencias de búsqueda
     */
    function hideSearchSuggestions() {
        const searchSuggestions = document.getElementById('search-suggestions');
        if (searchSuggestions) {
            searchSuggestions.style.display = 'none';
            searchSuggestions.innerHTML = '';
        }
    }

    // --- VARIABLES GLOBALES PARA OPTIMIZACIÓN ---
    let modalCache = null;
    let currentEscListener = null;

    // --- FUNCIONES PARA GESTIONAR MODALES OPTIMIZADOS ---

    function openProductModal(product) {
        const modal = document.getElementById('product-modal');
        if (!modal) return;

        // ⚡ OPTIMIZACIÓN: Cache y reutilización de elementos
        if (!modalCache) {
            modalCache = createModalTemplate();
        }

        // ⚡ OPTIMIZACIÓN: Actualización rápida de contenido
        updateModalContent(modalCache, product);

        // ⚡ OPTIMIZACIÓN: Solo configurar eventos una vez
        setupModalEvents(modalCache);

        // ⚡ OPTIMIZACIÓN: Mostrar modal sin bloqueo
        requestAnimationFrame(() => {
            document.body.classList.add('modal-open');
            modal.style.display = 'block';
        });
    }

    function createModalTemplate() {
        const modal = document.getElementById('product-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        // ⚡ ESTRUCTURA PROFESIONAL MEJORADA
        modalBody.innerHTML = `
            <div class="lightweight-modal-wrapper">
                <div class="modal-image-section">
                    <img id="modal-product-img" class="modal-product-image" loading="lazy" />
                </div>
                <div class="modal-content-section">
                    <div class="product-header">
                        <div class="product-category" id="modal-category"></div>
                        <h2 class="product-title-simple" id="modal-title"></h2>
                        <div class="rating-simple">★★★★★ (4.8/5)</div>
                    </div>
                    <div class="price-section">
                        <div class="current-price" id="modal-price"></div>
                        <div class="trust-badges">
                            <span class="badge">🔐 Pago seguro</span>
                            <span class="badge">🎯 Garantía incluida</span>
                        </div>
                    </div>
                    <div class="description-section">
                        <div class="professional-description" id="modal-main-desc">
                            <div class="description-preview" id="modal-desc-preview"></div>
                            <div class="description-full" id="modal-desc-full" style="display: none;"></div>
                        </div>
                    </div>
                    <div class="compact-info-row">
                        <span class="sku-info">SKU: <span id="modal-sku"></span></span>
                        <span class="stock-info">✓ En stock</span>
                    </div>
                    <div class="action-section" id="modal-actions"></div>
                </div>
            </div>
        `;

        return {
            img: modalBody.querySelector('#modal-product-img'),
            category: modalBody.querySelector('#modal-category'),
            title: modalBody.querySelector('#modal-title'),
            price: modalBody.querySelector('#modal-price'),
            descPreview: modalBody.querySelector('#modal-desc-preview'),
            descFull: modalBody.querySelector('#modal-desc-full'),
            sku: modalBody.querySelector('#modal-sku'),
            actions: modalBody.querySelector('#modal-actions')
        };
    }

    function updateModalContent(cache, product) {
        const price = parseFloat(String(product.precio_final).replace(/\./g, '').replace(',', '.')) || 0;
        const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
        
        // ⚡ ACTUALIZACIÓN ULTRA-RÁPIDA - SOLO LO ESENCIAL
        cache.img.src = product.imagen_principal;
        cache.img.alt = product.texto_alt_imagen;
        cache.category.textContent = product.categoria_principal || 'Producto';
        cache.title.textContent = product.nombre_producto;
        cache.price.textContent = formattedPrice;
        cache.sku.textContent = product.sku;
        
        // Procesamiento profesional de descripción larga
        const descripcionLarga = (product.descripcion_larga || product.descripcion_corta || 'Descripción no disponible')
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.trim());
        
        // Mostrar preview con "ver más" inline si hay más contenido
        const previewLines = descripcionLarga.slice(0, 2);
        let preview = previewLines.join(' ');
        
        if (preview.length > 150) {
            preview = preview.substring(0, 150) + '...';
        } else if (descripcionLarga.length > 2) {
            preview += '...';
        }
        
        // Agregar "ver más" inline si hay más contenido
        const hasMoreContent = descripcionLarga.length > 2 || preview.includes('...');
        if (hasMoreContent) {
            cache.descPreview.innerHTML = `${preview} <span class="ver-mas-link" style="color: #00b0fa; cursor: pointer; text-decoration: underline; font-size: 0.9em;">ver más</span>`;
        } else {
            cache.descPreview.textContent = preview;
        }
        
        // Descripción completa con "ver menos" al final
        const fullDescription = descripcionLarga.map(line => `<p>${line}</p>`).join('');
        cache.descFull.innerHTML = hasMoreContent ? 
            `${fullDescription}<span class="ver-menos-link" style="color: #00b0fa; cursor: pointer; text-decoration: underline; font-size: 0.9em; display: block; margin-top: 8px;">ver menos</span>` : 
            fullDescription;
        
        // Solo botón de agregar al carrito
        cache.actions.innerHTML = createAddToCartButtonHTML(product);
    }

    function setupModalEvents(cache) {
        // ⚡ OPTIMIZACIÓN: Remover listener anterior si existe
        if (currentEscListener) {
            document.removeEventListener('keydown', currentEscListener);
        }

        // ⚡ SISTEMA MINIMALISTA DE EXPANSIÓN - "VER MÁS" INLINE
        let expanded = false;
        
        // Event listener para "ver más" y "ver menos" inline
        cache.descPreview.addEventListener('click', function(e) {
            if (e.target.classList.contains('ver-mas-link')) {
                e.preventDefault();
                expanded = true;
                cache.descPreview.style.display = 'none';
                cache.descFull.style.display = 'block';
            }
        });
        
        cache.descFull.addEventListener('click', function(e) {
            if (e.target.classList.contains('ver-menos-link')) {
                e.preventDefault();
                expanded = false;
                cache.descPreview.style.display = 'block';
                cache.descFull.style.display = 'none';
            }
        });

        // ⚡ LISTENER ESC MINIMALISTA
        currentEscListener = function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
                document.removeEventListener('keydown', currentEscListener);
                currentEscListener = null;
            }
        };
        document.addEventListener('keydown', currentEscListener);

        // ⚡ CARGA DE IMAGEN INSTANTÁNEA
        cache.img.style.opacity = '1';
    }

    // Función para contactar por WhatsApp desde el modal
    function contactWhatsAppProduct(productName, price) {
        const message = `¡Hola! Me interesa este producto:\n\n📦 *${productName}*\n💰 Precio: ${price}\n\n¿Podrían darme más información sobre disponibilidad, envío y formas de pago?\n\n¡Gracias!`;
        const whatsappURL = `https://wa.me/573185801243?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    // Exponer la función globalmente
    window.contactWhatsAppProduct = contactWhatsAppProduct;

    function openCartModal() {
        const cartModal = document.getElementById('cart-modal');
        if (!cartModal) return;
        document.body.classList.add('modal-open');
        cartModal.style.display = 'block';
        
        // 🚀 NUEVO: Mostrar solo PASO 1 (Revisión del carrito) al abrir
        showCartStep1();
    }

    // 🚀 NUEVO: PASO 1 - Solo mostrar revisión del carrito
    function showCartStep1() {
        const cartModal = document.getElementById('cart-modal');
        if (!cartModal) return;
        
        const modalContent = cartModal.querySelector('.modal-content');
        if (!modalContent) return;
        
        // Actualizar título del modal para PASO 1
        const cartTitle = modalContent.querySelector('h2');
        if (cartTitle) {
            cartTitle.innerHTML = '🛒 Revisión de tu Pedido <span style="font-size:0.7em;color:#00b0fa;font-weight:normal;">(Paso 1 de 2)</span>';
        }
        
        const cartSubtitle = modalContent.querySelector('.cart-subtitle');
        if (cartSubtitle) {
            cartSubtitle.innerHTML = `
                <div style="text-align: center; margin: 1rem 0;">
                    <p style="margin: 0; color: #555; font-size: 0.95rem;">Revisa los productos antes de continuar con tus datos</p>
                    <div style="margin-top: 0.8rem; display: flex; justify-content: center; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.3rem; color: #00b0fa; font-weight: 600; font-size: 0.8rem;">
                            <div style="width: 24px; height: 24px; background: #00b0fa; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">1</div>
                            <span>Revisar</span>
                        </div>
                        <div style="width: 30px; height: 2px; background: #ddd; margin-top: 11px;"></div>
                        <div style="display: flex; align-items: center; gap: 0.3rem; color: #ccc; font-weight: 600; font-size: 0.8rem;">
                            <div style="width: 24px; height: 24px; background: #ddd; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">2</div>
                            <span>Finalizar</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Ocultar formulario de datos (PASO 2)
        const customerForm = modalContent.querySelector('.customer-data-form');
        if (customerForm) {
            customerForm.style.display = 'none';
        }
        
        // Ocultar botón de WhatsApp (PASO 2)
        const whatsappBtn = modalContent.querySelector('#send-whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.style.display = 'none';
        }
        
        // Actualizar UI del carrito con diseño mejorado
        updateCartUIStep1();
        
        // Agregar botón "Continuar" elegante
        addContinueButtonToCart();
    }

    // ✨ NUEVA: Actualizar UI del carrito para PASO 1 con diseño elegante
    function updateCartUIStep1() {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer) return;

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                    <h3 style="margin: 0 0 0.5rem 0; color: #333;">Tu carrito está vacío</h3>
                    <p style="margin: 0; font-size: 0.9rem;">Agrega algunos productos para continuar</p>
                </div>
            `;
            return;
        }

        let subtotal = 0;
        let totalItems = 0;
        let totalDescuentos = 0;

        const cartItemsHTML = cart.map((item, index) => {
            const price = parseFloat(String(item.precio_final).replace(/\./g, '').replace(',', '.')) || 0;
            const originalPrice = parseFloat(String(item.precio_original).replace(/\./g, '').replace(',', '.')) || price;
            const quantity = item.cantidad || 1;
            const itemSubtotal = price * quantity;
            const itemDiscount = originalPrice > price ? (originalPrice - price) * quantity : 0;
            
            subtotal += itemSubtotal;
            totalItems += quantity;
            totalDescuentos += itemDiscount;
            
            const priceFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
            const subtotalFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(itemSubtotal);
            const originalPriceFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(originalPrice);
            
            return `
                <div class="cart-item-elegant" style="
                    display: flex;
                    gap: 1rem;
                    padding: 1.2rem;
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    margin-bottom: 1rem;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                " onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'; this.style.transform='translateY(-1px)'" onmouseout="this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)'; this.style.transform='translateY(0)'">
                    
                    <div style="
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                        border-radius: 6px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        border: 1px solid #dee2e6;
                        overflow: hidden;
                    ">
                        ${item.imagen_principal ? `
                            <img src="${item.imagen_principal}" alt="${item.nombre_producto}" style="
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 4px;
                            " />
                        ` : `<span style="font-size: 1.2rem;">📦</span>`}
                    </div>
                    
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <h4 style="
                                margin: 0;
                                font-size: 0.95rem;
                                font-weight: 600;
                                color: #1f2937;
                                line-height: 1.3;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            ">${item.nombre_producto}</h4>
                            
                            <button class="remove-from-cart-btn" data-index="${index}" style="
                                background: #fee2e2;
                                color: #dc2626;
                                border: 1px solid #fecaca;
                                border-radius: 6px;
                                width: 28px;
                                height: 28px;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.8rem;
                                transition: all 0.2s ease;
                                flex-shrink: 0;
                                margin-left: 0.5rem;
                            " onmouseover="this.style.background='#fca5a5'; this.style.color='#991b1b'" onmouseout="this.style.background='#fee2e2'; this.style.color='#dc2626'" title="Eliminar producto">×</button>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.75rem; background: #e0f2fe; color: #0277bd; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 500;">
                                SKU: ${item.sku || 'N/A'}
                            </span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 0.8rem;">
                                <div style="display: flex; align-items: center; gap: 0.3rem; background: #f8f9fa; border-radius: 6px; padding: 0.2rem;">
                                    <button class="decrease-quantity" data-index="${index}" style="
                                        width: 24px; height: 24px; background: #6b7280; color: white; border: none; 
                                        border-radius: 4px; cursor: pointer; font-size: 0.8rem; display: flex; 
                                        align-items: center; justify-content: center;
                                    ">−</button>
                                    <span style="min-width: 24px; text-align: center; font-weight: 600; color: #374151;">${quantity}</span>
                                    <button class="increase-quantity" data-index="${index}" style="
                                        width: 24px; height: 24px; background: #00b0fa; color: white; border: none; 
                                        border-radius: 4px; cursor: pointer; font-size: 0.8rem; display: flex; 
                                        align-items: center; justify-content: center;
                                    ">+</button>
                                </div>
                                
                                <div style="font-size: 0.8rem;">
                                    <div style="display: flex; align-items: center; gap: 0.3rem;">
                                        ${itemDiscount > 0 ? `<span style="text-decoration: line-through; color: #9ca3af;">${originalPriceFormatted}</span>` : ''}
                                        <span style="color: #059669; font-weight: 600;">${priceFormatted}</span>
                                        ${itemDiscount > 0 ? `<span style="background: #dcfce7; color: #059669; padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 0.7rem;">-${Math.round(((originalPrice - price) / originalPrice) * 100)}%</span>` : ''}
                                    </div>
                                </div>
                            </div>
                            
                            <div style="text-align: right;">
                                <div style="font-weight: 700; color: #1f2937; font-size: 0.95rem;">${subtotalFormatted}</div>
                                ${itemDiscount > 0 ? `<div style="font-size: 0.7rem; color: #059669;">¡Ahorras ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(itemDiscount)}!</div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const totalFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(subtotal);
        const descuentosFormatted = totalDescuentos > 0 ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalDescuentos) : '';

        const summaryHTML = `
            <div class="cart-summary-step1" style="
                background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
                border: 2px solid #00b0fa;
                border-radius: 12px;
                padding: 1.5rem;
                margin-top: 1.5rem;
                text-align: center;
            ">
                <h3 style="margin: 0 0 1rem 0; color: #1f2937; font-size: 1.1rem;">
                    🧾 Resumen del Pedido
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #00b0fa;">${totalItems}</div>
                        <div style="font-size: 0.8rem; color: #6b7280;">Productos</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #059669;">${totalFormatted}</div>
                        <div style="font-size: 0.8rem; color: #6b7280;">Total</div>
                    </div>
                </div>
                
                ${totalDescuentos > 0 ? `
                    <div style="background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.6rem; margin-bottom: 1rem;">
                        <div style="color: #059669; font-weight: 600; font-size: 0.85rem; text-align: center;">
                            🎉 Descuento: ${descuentosFormatted}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        cartContainer.innerHTML = cartItemsHTML + summaryHTML;

        // Agregar event listeners para botones de cantidad
        setupQuantityControls();
    }

    // 🔧 Configurar controles de cantidad para el carrito elegante
    function setupQuantityControls() {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer) return;

        // Event listeners para aumentar cantidad
        cartContainer.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (cart[index]) {
                    cart[index].cantidad = (cart[index].cantidad || 1) + 1;
                    updateCartUIStep1();
                    updateCartUI(); // También actualizar el contador general
                    showToast(`➕ Cantidad aumentada`, 'success');
                }
            });
        });

        // Event listeners para disminuir cantidad
        cartContainer.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (cart[index] && cart[index].cantidad > 1) {
                    cart[index].cantidad -= 1;
                    updateCartUIStep1();
                    updateCartUI(); // También actualizar el contador general
                    showToast(`➖ Cantidad reducida`, 'success');
                }
            });
        });

        // Event listeners para eliminar productos
        cartContainer.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (cart[index]) {
                    const productName = cart[index].nombre_producto;
                    cart.splice(index, 1);
                    updateCartUIStep1();
                    updateCartUI(); // También actualizar el contador general
                    showToast(`🗑️ ${productName} eliminado del carrito`, 'success');
                    
                    // Si no quedan productos, mostrar mensaje vacío
                    if (cart.length === 0) {
                        setTimeout(() => {
                            const cartModal = document.getElementById('cart-modal');
                            if (cartModal) {
                                cartModal.style.display = 'none';
                            }
                        }, 1500);
                    }
                }
            });
        });
    }

    // 🚀 NUEVO: PASO 2 - Mostrar formulario de datos y botón WhatsApp
    function showCartStep2() {
        const cartModal = document.getElementById('cart-modal');
        if (!cartModal) return;
        
        const modalContent = cartModal.querySelector('.modal-content');
        if (!modalContent) return;
        
        // Actualizar título del modal para PASO 2
        const cartTitle = modalContent.querySelector('h2');
        if (cartTitle) {
            cartTitle.innerHTML = '📋 Finalizar Pedido <span style="font-size:0.7em;color:#00b0fa;font-weight:normal;">(Paso 2 de 2)</span>';
        }
        
        const cartSubtitle = modalContent.querySelector('.cart-subtitle');
        if (cartSubtitle) {
            cartSubtitle.innerHTML = `
                <div style="text-align: center; margin: 1rem 0;">
                    <p style="margin: 0; color: #555; font-size: 0.95rem;">Completa tus datos para enviar el pedido por WhatsApp</p>
                    <div style="margin-top: 0.8rem; display: flex; justify-content: center; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.3rem; color: #059669; font-weight: 600; font-size: 0.8rem;">
                            <div style="width: 24px; height: 24px; background: #059669; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">✓</div>
                            <span>Revisado</span>
                        </div>
                        <div style="width: 30px; height: 2px; background: #00b0fa; margin-top: 11px;"></div>
                        <div style="display: flex; align-items: center; gap: 0.3rem; color: #00b0fa; font-weight: 600; font-size: 0.8rem;">
                            <div style="width: 24px; height: 24px; background: #00b0fa; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">2</div>
                            <span>Finalizar</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Ocultar la lista de productos (mantener solo resumen)
        minimizeCartDisplay();
        
        // Mostrar formulario de datos (PASO 2)
        const customerForm = modalContent.querySelector('.customer-data-form');
        if (customerForm) {
            customerForm.style.display = 'block';
        }
        
        // Mostrar botón de WhatsApp (PASO 2)
        const whatsappBtn = modalContent.querySelector('#send-whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.style.display = 'block';
            
            // ✅ MEJORA: Agregar event listener específico para asegurar funcionamiento
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🚀 Event listener específico del botón WhatsApp activado');
                generateWhatsAppMessage();
            });
        }
        
        // Activar autocompletado y validación
        setTimeout(() => {
            setupAddressAutocomplete();
            setupFormProgressIndicator();
        }, 100);
        
        // Agregar botón "Volver" 
        addBackButtonToForm();
    }

    // 🚀 NUEVO: Agregar botón "Continuar" elegante al carrito
    function addContinueButtonToCart() {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer) return;
        
        // Remover botón anterior si existe
        const existingBtn = cartContainer.querySelector('.continue-btn-container');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        // Solo agregar si hay productos
        if (cart.length === 0) return;
        
        const continueButtonHTML = `
            <div class="continue-btn-container" style="margin-top: 2rem; text-align: center;">
                <button id="continue-to-form-btn" class="continue-btn" style="
                    width: 100%;
                    max-width: 380px;
                    padding: 1.2rem 2rem;
                    background: linear-gradient(135deg, #00b0fa 0%, #0099e0 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 176, 250, 0.3);
                    position: relative;
                    overflow: hidden;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 176, 250, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 176, 250, 0.3)'">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; position: relative; z-index: 1;">
                        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 22px; height: 22px;">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM19 21H5V3H13V9H19V21Z"/>
                        </svg>
                        <span>Continuar</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px;">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                    </div>
                    <div style="
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                        animation: shimmer 2s infinite;
                    "></div>
                </button>
            </div>
            <style>
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            </style>
        `;
        
        cartContainer.insertAdjacentHTML('beforeend', continueButtonHTML);
        
        // Event listener para el botón continuar
        const continueBtn = cartContainer.querySelector('#continue-to-form-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                // Efecto visual
                continueBtn.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    continueBtn.style.transform = 'scale(1)';
                }, 150);
                
                showToast('📋 Pasando al formulario de datos...', 'success');
                setTimeout(() => {
                    showCartStep2();
                }, 400);
            });
        }
    }

    // 🚀 NUEVO: Minimizar visualización del carrito en PASO 2
    function minimizeCartDisplay() {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer || cart.length === 0) return;
        
        // Calcular totales
        let subtotal = 0;
        let totalItems = 0;
        
        cart.forEach(item => {
            const price = parseFloat(String(item.precio_final).replace(/\./g, '').replace(',', '.')) || 0;
            const quantity = item.cantidad || 1;
            subtotal += price * quantity;
            totalItems += quantity;
        });
        
        const totalFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(subtotal);
        
        // Mostrar solo resumen compacto
        cartContainer.innerHTML = `
            <div class="cart-summary-compact" style="
                background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
                border: 2px solid #00b0fa;
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
                text-align: center;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.1rem; font-weight: 600; color: #0d1b2a;">
                        📦 ${totalItems} producto${totalItems > 1 ? 's' : ''} en tu carrito
                    </span>
                    <button id="show-cart-details-btn" style="
                        background: none;
                        border: 1px solid #00b0fa;
                        color: #00b0fa;
                        padding: 0.3rem 0.8rem;
                        border-radius: 6px;
                        font-size: 0.8rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='#00b0fa'; this.style.color='white'" onmouseout="this.style.background='none'; this.style.color='#00b0fa'">
                        Ver detalles
                    </button>
                </div>
                <div style="font-size: 1.3rem; font-weight: 800; color: #00b0fa;">
                    Total: ${totalFormatted}
                </div>
            </div>
        `;
        
        // Event listener para mostrar detalles
        const showDetailsBtn = cartContainer.querySelector('#show-cart-details-btn');
        if (showDetailsBtn) {
            showDetailsBtn.addEventListener('click', () => {
                showCartStep1(); // Volver al paso 1 para ver detalles
            });
        }
    }

    // 🚀 NUEVO: Agregar botón "Volver" al formulario
    function addBackButtonToForm() {
        const customerForm = document.querySelector('.customer-data-form');
        if (!customerForm) return;
        
        // Remover botón anterior si existe
        const existingBackBtn = customerForm.querySelector('.back-btn-container');
        if (existingBackBtn) {
            existingBackBtn.remove();
        }
        
        const backButtonHTML = `
            <div class="back-btn-container" style="margin-bottom: 1rem; text-align: left;">
                <button id="back-to-cart-btn" style="
                    background: none;
                    border: 2px solid #6c757d;
                    color: #6c757d;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                " onmouseover="this.style.borderColor='#495057'; this.style.color='#495057'" onmouseout="this.style.borderColor='#6c757d'; this.style.color='#6c757d'">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
                    </svg>
                    <span>Volver al Carrito</span>
                </button>
            </div>
        `;
        
        customerForm.insertAdjacentHTML('afterbegin', backButtonHTML);
        
        // Event listener para volver
        const backBtn = customerForm.querySelector('#back-to-cart-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                showToast('🛒 Volviendo a la revisión del carrito...', 'success');
                setTimeout(() => {
                    showCartStep1();
                }, 200);
            });
        }
    }

    // ✅ FASE B: Indicador de progreso del formulario
    function setupFormProgressIndicator() {
        const requiredFields = ['customer-name', 'customer-location', 'customer-email', 'customer-phone'];
        const progressBar = document.getElementById('form-progress');
        const progressText = document.getElementById('progress-text');
        
        if (!progressBar || !progressText) return;

        function updateProgress() {
            let completedFields = 0;
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field && field.value.trim()) {
                    completedFields++;
                }
            });

            const percentage = (completedFields / requiredFields.length) * 100;
            progressBar.style.width = percentage + '%';
            progressText.textContent = `${completedFields} de ${requiredFields.length} campos completados`;
            
            // Cambiar color cuando esté completo
            if (completedFields === requiredFields.length) {
                progressBar.style.background = 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)';
                progressText.style.color = '#16a34a';
                progressText.textContent = '✅ Formulario completo - ¡Listo para enviar!';
            } else {
                progressBar.style.background = 'linear-gradient(90deg, #00b0fa 0%, #0099e0 100%)';
                progressText.style.color = '#6c757d';
            }
        }

        // Escuchar cambios en los campos
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', updateProgress);
                field.addEventListener('blur', updateProgress);
            }
        });

        // Actualización inicial
        updateProgress();
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.classList.remove('modal-open');
    }

    // Exponer funciones importantes globalmente para el buscador y carrito
    window.openProductModal = openProductModal;
    window.openCartModal = openCartModal;
    window.closeAllModals = closeAllModals;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.changeQuantity = changeQuantity;
    window.updateCartUI = updateCartUI;
    window.generateWhatsAppMessage = generateWhatsAppMessage;
    window.formatPhoneNumber = formatPhoneNumber;
    window.highlightErrors = highlightErrors;
    window.clearErrorHighlights = clearErrorHighlights;
    // 🚀 NUEVAS FUNCIONES DE CARRITO EN 2 PASOS
    window.showCartStep1 = showCartStep1;
    window.showCartStep2 = showCartStep2;
    window.addContinueButtonToCart = addContinueButtonToCart;
    window.minimizeCartDisplay = minimizeCartDisplay;
    window.addBackButtonToForm = addBackButtonToForm;
    window.generateCartStep1Content = generateCartStep1Content;

    // --- FUNCIONES PARA GESTIONAR EL CARRITO MEJORADO ---

    function addToCart(productId) {
        const productToAdd = allProducts.find(p => p.id_del_producto == productId);
        if (!productToAdd || productToAdd.stock <= 0) {
            showToast('Este producto no está disponible.', 'error');
            return;
        }
        
        // ✅ MEJORA: Buscar si el producto ya existe en el carrito
        const existingItemIndex = cart.findIndex(item => item.id_del_producto == productId);
        
        if (existingItemIndex !== -1) {
            // Si ya existe, incrementar cantidad
            const currentQty = cart[existingItemIndex].cantidad || 1;
            const maxStock = productToAdd.stock || 99;
            
            if (currentQty >= maxStock) {
                showToast(`No puedes agregar más de ${maxStock} unidades de este producto.`, 'error');
                return;
            }
            
            cart[existingItemIndex].cantidad = currentQty + 1;
            showToast(`Cantidad actualizada: ${cart[existingItemIndex].cantidad} unidades`);
        } else {
            // Si no existe, agregarlo con cantidad 1
            const newItem = { ...productToAdd, cantidad: 1 };
            cart.push(newItem);
            showToast(`"${productToAdd.nombre_producto}" fue añadido al carrito.`);
        }
        
        localStorage.setItem('ingenioCart', JSON.stringify(cart));
        updateCartUI();
    }

    // ✅ NUEVA FUNCIÓN: Cambiar cantidad de productos con debounce optimizado
    function changeQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id_del_producto == productId);
        if (itemIndex === -1) return;
        
        const item = cart[itemIndex];
        const newQuantity = (item.cantidad || 1) + change;
        const product = allProducts.find(p => p.id_del_producto == productId);
        const maxStock = product?.stock || 99;
        
        if (newQuantity <= 0) {
            // Si la cantidad llega a 0, eliminar el producto
            removeFromCart(productId);
            return;
        }
        
        if (newQuantity > maxStock) {
            showToast(`Stock máximo disponible: ${maxStock} unidades`, 'error');
            return;
        }
        
        cart[itemIndex].cantidad = newQuantity;
        localStorage.setItem('ingenioCart', JSON.stringify(cart));
        
        // ✅ MEJORA: Actualización optimizada con debounce
        clearTimeout(window.cartUpdateTimeout);
        window.cartUpdateTimeout = setTimeout(() => {
            updateCartUI();
            showToast(`Cantidad actualizada: ${newQuantity} unidades`, 'success');
        }, 150);
    }


    function updateCartUI() {
        const cartContainer = document.getElementById('cart-items-container');
        const cartCount = document.getElementById('cart-count');
        if (!cartContainer || !cartCount) return;
        
        // ✅ MEJORA: Calcular total de items correctamente con micro-animación
        const totalItems = cart.reduce((sum, item) => sum + (item.cantidad || 1), 0);
        const previousCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = totalItems;
        
        // Micro-animación cuando cambia el contador
        if (totalItems > previousCount && totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            cartCount.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart-state">
                    <div class="empty-cart-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                    <h3>Tu carrito está vacío</h3>
                    <p>¡Agrega productos y realiza tu pedido por WhatsApp!</p>
                </div>
            `;
        } else {
            // 🚀 NUEVO: Generar contenido del carrito para PASO 1 (detallado)
            generateCartStep1Content();
        }
    }

    // 🚀 NUEVO: Generar contenido detallado del carrito (PASO 1)
    function generateCartStep1Content() {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer) return;
        
        let subtotal = 0;
        let totalDescuentos = 0;
        
        const cartItemsHTML = cart.map(item => {
            const price = parseFloat(String(item.precio_final).replace(/\./g, '').replace(',', '.')) || 0;
            const originalPrice = parseFloat(String(item.precio_original).replace(/\./g, '').replace(',', '.')) || price;
            const quantity = item.cantidad || 1;
            const itemSubtotal = price * quantity;
            const itemDiscount = originalPrice > price ? (originalPrice - price) * quantity : 0;
            
            subtotal += itemSubtotal;
            totalDescuentos += itemDiscount;
            
            return `
                <div class="cart-item-improved">
                    <div class="cart-item-image" style="width: 50px; height: 50px; flex-shrink: 0; border-radius: 6px; overflow: hidden;">
                        <img src="${item.imagen_principal}" alt="${item.nombre_producto}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" decoding="async">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.nombre_producto}</h4>
                        <p class="cart-item-sku">SKU: ${item.sku || 'N/A'}</p>
                        
                        <div class="cart-item-pricing">
                            <span class="cart-item-price">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)}</span>
                            ${itemDiscount > 0 ? `<span class="cart-item-original-price">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(originalPrice)}</span>` : ''}
                        </div>
                        
                        <div class="cart-quantity-controls">
                            <button class="qty-btn decrease-qty-btn" data-id="${item.id_del_producto}" aria-label="Disminuir cantidad">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <span class="qty-display">${quantity}</span>
                            <button class="qty-btn increase-qty-btn" data-id="${item.id_del_producto}" aria-label="Aumentar cantidad">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                        
                        <div class="cart-item-subtotal">
                            <strong>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(itemSubtotal)}</strong>
                            ${itemDiscount > 0 ? `<small class="savings">Ahorras: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(itemDiscount)}</small>` : ''}
                        </div>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id_del_producto}" aria-label="Eliminar ${item.nombre_producto}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            `;
        }).join('');
        
        const totalItems = cart.reduce((sum, item) => sum + (item.cantidad || 1), 0);
        const total = subtotal;
        
        cartContainer.innerHTML = `
            ${cartItemsHTML}
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal (${totalItems} productos):</span>
                    <span>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(subtotal)}</span>
                </div>
                ${totalDescuentos > 0 ? `
                    <div class="cart-summary-row discount">
                        <span>🎉 Descuentos aplicados:</span>
                        <span>-${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalDescuentos)}</span>
                    </div>
                ` : ''}
                <div class="cart-summary-total">
                    <span><strong>Total a pagar:</strong></span>
                    <span><strong>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total)}</strong></span>
                </div>
                ${totalDescuentos > 0 ? `
                    <div class="total-savings">
                        💰 ¡Estás ahorrando ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalDescuentos)}!
                    </div>
                ` : ''}
            </div>
        `;
        
        // 🚀 NUEVO: Agregar botón "Continuar" automáticamente después de generar el contenido
        addContinueButtonToCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id_del_producto != productId);
        localStorage.setItem('ingenioCart', JSON.stringify(cart));
        updateCartUI();
        showToast('Producto eliminado del carrito.', 'error');
    }

    function generateWhatsAppMessage() {
        console.log('🚀 Iniciando generateWhatsAppMessage()...');
        
        const whatsappBtn = document.getElementById('send-whatsapp-btn');
        if (!whatsappBtn) {
            console.error('❌ Botón de WhatsApp no encontrado');
            showToast('Error: Botón no encontrado. Recarga la página.', 'error');
            return;
        }
        
        const originalBtnContent = whatsappBtn.innerHTML;
        
        // Estado de carga profesional
        whatsappBtn.disabled = true;
        whatsappBtn.innerHTML = `
            <div class="btn-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; width: 24px; height: 24px;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                </svg>
                <div class="btn-text">
                    <span class="btn-main-text">Generando pedido...</span>
                    <span class="btn-sub-text">Procesando información</span>
                </div>
            </div>
        `;
        
        const customerNameInput = document.getElementById('customer-name');
        const customerLocationInput = document.getElementById('customer-location');
        const customerEmailInput = document.getElementById('customer-email');
        const customerPhoneInput = document.getElementById('customer-phone');
        const customerCommentsInput = document.getElementById('customer-comments');

        const customerName = customerNameInput?.value.trim() || '';
        const customerLocation = customerLocationInput?.value.trim() || '';
        const customerEmail = customerEmailInput?.value.trim() || '';
        const customerPhone = customerPhoneInput?.value.trim() || '';
        const customerComments = customerCommentsInput?.value.trim() || '';

        // ✅ MEJORA: Validación más robusta con teléfono obligatorio
        const validationErrors = [];
        
        if (!customerName) validationErrors.push('Nombre completo');
        if (!customerLocation) validationErrors.push('Dirección de entrega');
        if (!customerEmail) validationErrors.push('Correo electrónico');
        if (!customerPhone) validationErrors.push('Teléfono de contacto');
        
        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (customerEmail && !emailRegex.test(customerEmail)) {
            validationErrors.push('Formato de correo válido');
        }
        
        // Validación de formato de teléfono colombiano
        const phoneRegex = /^(\+57|57)?[\s\-]?[3][0-9]{9}$/;
        if (customerPhone && !phoneRegex.test(customerPhone.replace(/[\s\-]/g, ''))) {
            validationErrors.push('Formato de teléfono colombiano válido (+57 300 123 4567)');
        }
        
        if (validationErrors.length > 0) {
            showToast(`❌ Por favor completa: ${validationErrors.join(', ')}.`, 'error');
            
            // Destacar campos con errores
            highlightErrors([customerNameInput, customerLocationInput, customerEmailInput, customerPhoneInput], [!customerName, !customerLocation, !customerEmail || !emailRegex.test(customerEmail), !customerPhone || !phoneRegex.test(customerPhone.replace(/[\s\-]/g, ''))]);
            
            // Restaurar botón si hay errores
            whatsappBtn.disabled = false;
            whatsappBtn.innerHTML = originalBtnContent;
            return;
        }
        
        if (cart.length === 0) {
            showToast('🛒 Tu carrito está vacío. Agrega productos antes de realizar el pedido.', 'error');
            
            // Restaurar botón si carrito vacío
            whatsappBtn.disabled = false;
            whatsappBtn.innerHTML = originalBtnContent;
            return;
        }

        // ✅ MEJORA: Calcular totales correctamente
        let subtotal = 0;
        let totalDescuentos = 0;
        let totalItems = 0;

        const productDetails = cart.map((item, index) => {
            const price = parseFloat(String(item.precio_final).replace(/\./g, '').replace(',', '.')) || 0;
            const originalPrice = parseFloat(String(item.precio_original).replace(/\./g, '').replace(',', '.')) || price;
            const quantity = item.cantidad || 1;
            const itemSubtotal = price * quantity;
            const itemDiscount = originalPrice > price ? (originalPrice - price) * quantity : 0;
            
            subtotal += itemSubtotal;
            totalDescuentos += itemDiscount;
            totalItems += quantity;
            
            const priceFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
            const subtotalFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(itemSubtotal);
            
            return `${index + 1}️⃣ *${item.nombre_producto}*
📦 SKU: ${item.sku || 'N/A'}
🔢 Cantidad: ${quantity} unidades
💰 Precio unitario: ${priceFormatted}
💵 Subtotal: ${subtotalFormatted}${itemDiscount > 0 ? ` (¡Descuento aplicado!)` : ''}`;
        }).join('\n\n');

        const totalFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(subtotal);
        const descuentosFormatted = totalDescuentos > 0 ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalDescuentos) : '';

        // ✅ MEJORA: Mensaje WhatsApp más profesional con dirección
        const header = `🏢 *SOLICITUD DE COTIZACIÓN - INGENIO RED*

👤 *INFORMACIÓN DEL CLIENTE:*
• Nombre: ${customerName}
• 📍 Dirección: ${customerLocation}
• 📞 Teléfono: ${customerPhone}
• 📧 Email: ${customerEmail}

🛍️ *PRODUCTOS SOLICITADOS (${totalItems} productos):*

${productDetails}

💰 *RESUMEN COMERCIAL:*
• Subtotal productos: ${totalFormatted}${totalDescuentos > 0 ? `\n• 🎉 Descuentos aplicados: -${descuentosFormatted}\n• ✨ TOTAL ESTIMADO: ${totalFormatted}` : `\n• 🏆 TOTAL ESTIMADO: ${totalFormatted}`}${totalDescuentos > 0 ? `\n\n💸 *¡Ahorro total: ${descuentosFormatted}!*` : ''}`;

        const comments = customerComments ? `\n\n💬 *COMENTARIOS ESPECIALES:*\n"${customerComments}"` : '';
        
        const footer = `\n\n⏰ *PRÓXIMOS PASOS:*
1. Confirmación de disponibilidad por nuestro asesor
2. Cálculo de envío a su dirección exacta  
3. Métodos de pago: Nequi, Daviplata, Bancolombia
4. Coordinación de entrega y tiempo estimado

🤝 ¡Gracias por confiar en Ingenio Red!`;

        const fullMessage = encodeURIComponent(header + comments + footer);
        
        // 🚀 MEJORA: Usar método más confiable
        const whatsappNumber = WHATSAPP_NUMBER.replace('+', '');
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${fullMessage}`;
        
        console.log('🚀 Preparando envío a WhatsApp:', whatsappNumber);
        
        // ✅ MEJORA: Feedback antes de enviar 
        showToast('🚀 ¡Abriendo WhatsApp con tu pedido completo!', 'success');
        
        console.log('📱 Enviando a WhatsApp:', whatsappNumber);
        console.log('📝 Mensaje:', fullMessage.substring(0, 100) + '...');
        
        try {
            // Método más simple y universal
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            
            // 🚀 NUEVO: Enviar backup por email usando Cloudflare Worker (sin bloquear)
            sendEmailBackup({
                customer: {
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    address: customerLocation,
                    comments: customerComments
                },
                items: cart.map(item => ({
                    id: item.sku || item.id,
                    name: item.nombre_producto,
                    quantity: item.cantidad || 1,
                    price: parseFloat(String(item.precio_final).replace(/\./g, '').replace(',', '.')) || 0
                })),
                total: subtotal,
                timestamp: new Date().toISOString()
            }).catch(error => {
                console.warn('⚠️ Email backup falló (no afecta al pedido):', error);
            });
            
            // Mostrar mensaje de confirmación
            setTimeout(() => {
                showToast('✅ ¡WhatsApp abierto! Tu asesor recibirá el pedido inmediatamente.', 'success');
            }, 1000);
            
        } catch (error) {
            console.error('Error al abrir WhatsApp:', error);
            showToast('❌ Error al abrir WhatsApp. Inténtalo de nuevo.', 'error');
            
            // Restaurar botón en caso de error
            whatsappBtn.disabled = false;
            whatsappBtn.innerHTML = originalBtnContent;
            return;
        }
        
        // ✅ MEJORA: Limpiar formulario después del envío exitoso
        setTimeout(() => {
            if (customerNameInput) customerNameInput.value = '';
            if (customerLocationInput) customerLocationInput.value = '';
            if (customerEmailInput) customerEmailInput.value = '';
            if (customerPhoneInput) customerPhoneInput.value = '';
            if (customerCommentsInput) customerCommentsInput.value = '';
            
            // Limpiar estilos de error
            clearErrorHighlights();
            
            // Cerrar modal del carrito automáticamente después del envío
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) {
                cartModal.style.display = 'none';
            }
            
            // Limpiar carrito después del envío exitoso
            cart = [];
            updateCartUI();
            
        }, 2000);
        
        // Restaurar botón después de procesar
        setTimeout(() => {
            whatsappBtn.disabled = false;
            whatsappBtn.innerHTML = originalBtnContent;
        }, 1500);
    }

    // ✅ NUEVA FUNCIÓN: Destacar campos con errores
    function highlightErrors(inputs, hasErrors) {
        inputs.forEach((input, index) => {
            if (input && hasErrors[index]) {
                input.style.borderColor = '#dc3545';
                input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            }
        });
    }

    // ✅ NUEVA FUNCIÓN: Limpiar estilos de error
    function clearErrorHighlights() {
        const inputs = document.querySelectorAll('#customer-name, #customer-location, #customer-email, #customer-phone');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    }

    // ✅ NUEVA FUNCIÓN: Formatear teléfono automáticamente
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        // Si empieza con 57, agregar +
        if (value.startsWith('57') && value.length > 2) {
            value = '+' + value;
        }
        // Si no tiene código de país, agregarlo
        else if (value.length === 10 && value.startsWith('3')) {
            value = '+57 ' + value;
        }
        // Si tiene 11 dígitos y empieza con 573, formatear
        else if (value.length === 11 && value.startsWith('573')) {
            value = '+57 ' + value.substring(2);
        }
        
        // Formatear con espacios
        if (value.startsWith('+57') && value.length > 3) {
            const number = value.substring(3).replace(/\s/g, '');
            if (number.length >= 3) {
                value = '+57 ' + number.substring(0, 3) + ' ' + number.substring(3, 6) + ' ' + number.substring(6, 10);
            }
        }
        
        input.value = value;
    }

    // ✅ FASE B: Autocompletado inteligente para ciudades colombianas
    const ciudadesColombianas = [
        'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 
        'Ibagué', 'Pasto', 'Manizales', 'Neiva', 'Villavicencio', 'Armenia', 'Valledupar', 'Montería', 'Sincelejo',
        'Popayán', 'Buenaventura', 'Tunja', 'Florencia', 'Riohacha', 'Yopal', 'Quibdó', 'Mocoa', 'San Andrés'
    ];

    function setupAddressAutocomplete() {
        const addressInput = document.getElementById('customer-location');
        if (!addressInput) return;

        let suggestionsList = null;

        addressInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            const suggestions = ciudadesColombianas.filter(city => 
                city.toLowerCase().includes(value) && value.length >= 2
            ).slice(0, 5);

            // Remover lista anterior
            if (suggestionsList) {
                suggestionsList.remove();
                suggestionsList = null;
            }

            if (suggestions.length > 0 && value.length >= 2) {
                suggestionsList = document.createElement('div');
                suggestionsList.className = 'address-suggestions';
                suggestionsList.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    z-index: 1000;
                    max-height: 200px;
                    overflow-y: auto;
                `;

                suggestions.forEach(city => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.textContent = city;
                    item.style.cssText = `
                        padding: 12px 16px;
                        cursor: pointer;
                        border-bottom: 1px solid #f0f0f0;
                        transition: background-color 0.2s ease;
                    `;
                    
                    item.addEventListener('mouseenter', () => {
                        item.style.backgroundColor = '#f8f9fa';
                    });
                    
                    item.addEventListener('mouseleave', () => {
                        item.style.backgroundColor = 'white';
                    });

                    item.addEventListener('click', () => {
                        const currentValue = addressInput.value;
                        const words = currentValue.split(' ');
                        words[words.length - 1] = city;
                        addressInput.value = words.join(' ');
                        suggestionsList.remove();
                        suggestionsList = null;
                    });

                    suggestionsList.appendChild(item);
                });

                // Posicionar relativo al input
                addressInput.parentNode.style.position = 'relative';
                addressInput.parentNode.appendChild(suggestionsList);
            }
        });

        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (suggestionsList && !addressInput.contains(e.target) && !suggestionsList.contains(e.target)) {
                suggestionsList.remove();
                suggestionsList = null;
            }
        });
    }

    // Asegurar feedback visual en botones y accesibilidad
    // (esto ya está en CSS, pero aquí nos aseguramos de que los botones sean focusables)
    document.querySelectorAll('button, .add-to-cart-btn, .close-button, .remove-from-cart-btn').forEach(btn => {
        btn.setAttribute('tabindex', '0');
    });

    // --- DATOS ESTRUCTURADOS JSON-LD PARA SEO LOCAL ---
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Ingenio Red",
        "image": "https://res.cloudinary.com/dhqpxn3y4/image/upload/v1716584297/banner-placeholder_qzk1qj.jpg",
        "@id": "https://ingeniored.com/",
        "url": "https://ingeniored.com/",
        "telephone": "+57 318 580 1243",
        "email": "servicioalcliente@ingeniored.org",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bogotá",
            "addressLocality": "Bogotá",
            "addressRegion": "Cundinamarca",
            "addressCountry": "CO"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 4.710989,
            "longitude": -74.072092
        },
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        }],
        "sameAs": [
            "https://facebook.com",
            "https://instagram.com",
            "https://youtube.com",
            "https://linkedin.com",
            "https://wa.me/573185801243"
        ]
    };
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.textContent = JSON.stringify(jsonLd, null, 2);
    document.body.appendChild(ldScript);

    // --- BANNER DE COOKIES (desactivado por preferencia del usuario) ---
    // function showCookieBanner() {
    //     // No mostrar si ya fue aceptado
    //     if (localStorage.getItem('cookieConsent') === 'accepted') return;
    //     if (document.querySelector('.cookie-banner')) return;
    //     const banner = document.createElement('div');
    //     banner.className = 'cookie-banner';
    //     banner.setAttribute('role', 'region');
    //     banner.setAttribute('aria-label', 'Aviso de cookies');
    //     banner.innerHTML = `
    //         <span class="cookie-banner__text">
    //             Usamos <strong>solo cookies técnicas necesarias</strong> para el funcionamiento del sitio. No usamos cookies de seguimiento ni analítica. 
    //             <a href="privacidad.html" class="cookie-banner__link">Más información</a>
    //         </span>
    //         <button class="cookie-banner__btn" type="button">Entendido</button>
    //     `;
    //     document.body.appendChild(banner);
    //     // Accesibilidad: foco al botón
    //     setTimeout(() => {
    //         banner.querySelector('.cookie-banner__btn').focus();
    //     }, 300);
    //     // Cerrar banner
    //     banner.querySelector('.cookie-banner__btn').addEventListener('click', () => {
    //         banner.classList.add('hide');
    //         localStorage.setItem('cookieConsent', 'accepted');
    //         setTimeout(() => banner.remove(), 500);
    //     });
    //     // Cerrar con Esc
    //     banner.addEventListener('keydown', e => {
    //         if (e.key === 'Escape') {
    //             banner.classList.add('hide');
    //             localStorage.setItem('cookieConsent', 'accepted');
    //             setTimeout(() => banner.remove(), 500);
    //         }
    //     });
    // }
    // Llamar al mostrar banner tras cargar la página
    // showCookieBanner();

    // 🚀 INICIALIZAR NUEVAS FUNCIONALIDADES FASE 4
    initializeFase4Features();

    // ¡Iniciamos la aplicación!
    initializeApp();
});

/**
 * Carga el JSON de imágenes de categorías desde recursos_visuales.json
 * Devuelve un array de objetos: { categoria, url_imagen_cloudinary }
 */
async function cargarImagenesCategoriasJSON() {
    try {
        const response = await fetch('recursos_visuales.json');
        if (!response.ok) throw new Error('No se pudo cargar recursos_visuales.json');
        return await response.json();
    } catch (error) {
        console.error('Error al cargar imágenes de categorías:', error);
        return [];
    }
}

// 🚀 FUNCIONES DE INICIALIZACIÓN FASE 4

function initializeFase4Features() {
    console.log("🚀 Inicializando funcionalidades FASE 4 simplificadas...");
    
    // Solo inicializar funciones activas
    if (ENHANCEMENT_CONFIG.favoriteSystem) {
        updateFavoriteButtons();
    }
    
    // Agregar event listeners globales para nuevas funcionalidades
    setupFase4EventListeners();
    
    console.log("✅ FASE 4 inicializada correctamente - Versión optimizada");
}

function setupFase4EventListeners() {
    // Solo agregar listeners para funcionalidades activas
    if (ENHANCEMENT_CONFIG.favoriteSystem) {
        // Event listener para botones de favoritos (delegación de eventos)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-favorite')) {
                const productId = e.target.dataset.productId;
                if (productId) {
                    toggleFavorite(productId);
                }
            }
        });
    }
}

// Exponer funciones globalmente solo si están activas
if (ENHANCEMENT_CONFIG.favoriteSystem) {
    window.toggleFavorite = toggleFavorite;
}

// --- DARK MODE FOOTER BUTTON ---
document.addEventListener('DOMContentLoaded', () => {
  // --- DARK MODE FOOTER BUTTON ---
  // Esperar a que el footer esté generado
  setTimeout(() => {
    const footerDarkBtn = document.getElementById('footer-darkmode-btn');
    if (footerDarkBtn) {
      const iconSpan = footerDarkBtn.querySelector('.footer-darkmode-icon');
      const textSpan = footerDarkBtn.querySelector('.footer-darkmode-text');
      function updateIcon() {
        if (document.body.classList.contains('dark-mode')) {
          iconSpan.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 11.5A6.5 6.5 0 0 1 11 18c-3.59 0-6.5-2.91-6.5-6.5 0-2.97 2.04-5.45 4.89-6.28a.75.75 0 0 1 .94.94A5 5 0 0 0 16 16.17a.75.75 0 0 1 .94.94A6.48 6.48 0 0 1 17.5 11.5Z" fill="#00b0fa"/></svg>`;
          textSpan.textContent = 'Modo claro';
        } else {
          iconSpan.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="5.5" stroke="#00b0fa" stroke-width="2"/><path d="M11 2v2M11 18v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M2 11h2M18 11h2M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42" stroke="#00b0fa" stroke-width="2" stroke-linecap="round"/></svg>`;
          textSpan.textContent = 'Modo oscuro';
        }
      }
      updateIcon();
      footerDarkBtn.onclick = function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? '1' : '0');
        updateIcon();
      };
      if (localStorage.getItem('darkMode') === '1') {
        document.body.classList.add('dark-mode');
        updateIcon();
      }
    }
  }, 200);
});

// --- BOTÓN FLOTANTE DE WHATSAPP CLÁSICO ---
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.whatsapp-floating-btn')) {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = 'https://api.whatsapp.com/send?phone=573185801243';
        whatsappBtn.className = 'whatsapp-floating-btn';
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.title = 'Chatea con nosotros por WhatsApp';
        whatsappBtn.innerHTML = `
            <img src="assets/icons/whatsapp.svg" alt="WhatsApp" style="width:48px;height:48px;">
        `;
        Object.assign(whatsappBtn.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#25D366',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.2s',
        });
        whatsappBtn.onmouseover = () => whatsappBtn.style.boxShadow = '0 6px 18px rgba(37,211,102,0.4)';
        whatsappBtn.onmouseout = () => whatsappBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        document.body.appendChild(whatsappBtn);
    }
});

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
    localStorage.setItem(`ingenio_${key}`, JSON.stringify(item));
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
 * Mejorar el manejo de errores para los recursos
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

document.addEventListener('DOMContentLoaded', function() {
    // --- HEADER LOGO SIEMPRE PRESENTE Y ENLACE AL HOME ---
    function ensureHeaderLogo() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        let logoContainer = header.querySelector('.logo-container');
        if (!logoContainer) {
            logoContainer = document.createElement('div');
            logoContainer.className = 'logo-container';
            header.prepend(logoContainer);
        }
        // Reemplazar cualquier placeholder por el logo real y eliminar placeholders
        logoContainer.innerHTML = `<a href="index.html" aria-label="Ir al inicio">
            <img src="assets/icons/logo.svg" alt="Logo Ingenio Red" style="max-height:50px;display:block;" />
        </a>`;
        // Eliminar placeholders visuales si existen
        const placeholders = header.querySelectorAll('.logo-placeholder, .logo-placeholder-header');
        placeholders.forEach(ph => ph.remove());
    }
    ensureHeaderLogo();
});

// Animación: giro 180° al pasar el mouse sobre el logo en el header y animación de color en el texto "Ingenio Red" del header
setTimeout(() => {
  const logoHeader = document.querySelector('.site-header .logo-container img');
  const ingenioRedHeaderText = document.querySelector('.site-header .logo-container span');
  if (logoHeader) {
    logoHeader.style.transition = 'transform 0.5s cubic-bezier(.4,1.6,.6,1)';
    logoHeader.addEventListener('mouseenter', () => {
      logoHeader.style.transform = 'rotate(180deg)';
    });
    logoHeader.addEventListener('mouseleave', () => {
      logoHeader.style.transform = 'rotate(0deg)';
    });
  }
  if (ingenioRedHeaderText) {
    ingenioRedHeaderText.style.transition = 'color 0.3s cubic-bezier(.4,1.6,.6,1)';
    ingenioRedHeaderText.addEventListener('mouseenter', () => {
      ingenioRedHeaderText.style.color = '#ffd600';
    });
    ingenioRedHeaderText.addEventListener('mouseleave', () => {
      ingenioRedHeaderText.style.color = '#00b0fa';
    });
    ingenioRedHeaderText.addEventListener('mousedown', () => {
      ingenioRedHeaderText.style.color = '#ffd600';
    });
    ingenioRedHeaderText.addEventListener('mouseup', () => {
      ingenioRedHeaderText.style.color = '#ffd600';
    });
  }
}, 350);

// Animación: giro 180° al pasar el mouse sobre el logo en el footer y animación de color en el texto "Ingenio Red"
setTimeout(() => {
  const logoFooter = document.querySelector('.footer-logo-anim');
  const ingenioRedText = document.querySelector('#footer-brand a span');
  if (logoFooter) {
    logoFooter.style.transition = 'transform 0.5s cubic-bezier(.4,1.6,.6,1)';
    logoFooter.addEventListener('mouseenter', () => {
      logoFooter.style.transform = 'rotate(180deg)';
    });
    logoFooter.addEventListener('mouseleave', () => {
      logoFooter.style.transform = 'rotate(0deg)';
    });
  }
  if (ingenioRedText) {
    ingenioRedText.style.transition = 'color 0.3s cubic-bezier(.4,1.6,.6,1)';
    ingenioRedText.addEventListener('mouseenter', () => {
      ingenioRedText.style.color = '#ffd600';
    });
    ingenioRedText.addEventListener('mouseleave', () => {
      ingenioRedText.style.color = '#00b0fa';
    });
    ingenioRedText.addEventListener('mousedown', () => {
      ingenioRedText.style.color = '#ffd600';
    });
    ingenioRedText.addEventListener('mouseup', () => {
      ingenioRedText.style.color = '#ffd600';
    });
  }
}, 300);

// --- Animación y mejora de eslogan en el footer ---
setTimeout(() => {
  const slogan = document.querySelector('#footer-brand > span');
  // Eliminar claim si existe
  const claim = document.querySelector('#footer-brand .brand-claim');
  if (claim) claim.remove();
  // Eliminar oración anterior si existe
  const oldDesc = document.querySelector('#footer-brand .footer-slogan-desc');
  if (oldDesc) oldDesc.remove();
  // Nueva oración con estilo simple y línea animada
  if (slogan && slogan.parentNode) {
    const desc = document.createElement('div');
    desc.className = 'footer-slogan-desc';
    // Primera letra en mayúscula, resto igual
    desc.textContent = 'La tecnologia que conecta tu mundo, con la energia para mover el planeta!';
    desc.style.display = 'inline-block';
    desc.style.color = '#fff';
    desc.style.fontSize = '1.13rem';
    desc.style.fontWeight = '700';
    desc.style.marginTop = '38px';
    desc.style.letterSpacing = '0.3px';
    desc.style.lineHeight = '1.35';
    desc.style.maxWidth = '420px';
    desc.style.textAlign = 'left';
    desc.style.position = 'relative';
    desc.style.paddingBottom = '4px';
    desc.style.cursor = 'pointer';
    // Línea horizontal amarilla
    desc.style.borderBottom = '3px solid #ffd600';
    desc.style.transition = 'border-color 0.35s cubic-bezier(.4,1.6,.6,1)';
    // Animación: solo la línea cambia de amarillo a azul al hover
    desc.addEventListener('mouseenter', () => {
      desc.style.borderBottomColor = '#00b0fa';
    });
    desc.addEventListener('mouseleave', () => {
      desc.style.borderBottomColor = '#ffd600';
    });
    slogan.parentNode.insertBefore(desc, slogan.nextSibling);
  }
  // Responsive: ajustar tamaño en móviles
  function responsiveSlogan() {
    const desc = document.querySelector('#footer-brand .footer-slogan-desc');
    if (window.innerWidth < 500) {
      if (desc) desc.style.fontSize = '0.99rem';
      if (desc) desc.style.maxWidth = '98vw';
      if (desc) desc.style.marginTop = '22px';
    } else {
      if (desc) desc.style.fontSize = '1.13rem';
      if (desc) desc.style.maxWidth = '420px';
      if (desc) desc.style.marginTop = '38px';
    }
  }
  window.addEventListener('resize', responsiveSlogan);
  responsiveSlogan();
}, 400);

// --- NUEVO CARRUSEL DE BANNERS EN LA HOME ---
async function mostrarCarruselBanners() {
    const container = document.getElementById('banner-carrusel');
    if (!container) return;
    try {
        const response = await fetch('recursos_visuales.json');
        const data = await response.json();
        const banners = data.banners_principales;
        if (!banners || banners.length === 0) return;
        container.innerHTML = `
            <div class="carrusel-imagenes">
                ${banners.map((url, i) => `
                    <img src="${url}" class="carrusel-banner${i === 0 ? ' activo' : ''}" style="display:${i === 0 ? 'block' : 'none'};" alt="Banner ${i+1}" loading="lazy">
                `).join('')}
            </div>
        `;
        let actual = 0;
        setInterval(() => {
            const imgs = container.querySelectorAll('.carrusel-banner');
            imgs.forEach((img, i) => {
                img.style.display = i === actual ? 'block' : 'none';
                img.classList.toggle('activo', i === actual);
            });
            actual = (actual + 1) % banners.length;
        }, 3500);
    } catch (error) {
        console.error('Error cargando banners:', error);
    }
}
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', mostrarCarruselBanners);
}

// CARRUSEL NOVEDOSO DE BANNERS PRINCIPALES
function cargarCarruselBanners() {
  fetch('recursos_visuales.json')
    .then(res => res.json())
    .then(data => {
      const banners = data
        .map(item => ({
          url: item.url_banner_carrusel_superior,
          alt: item.banner_carrusel_superior || item.categoria
        }))
        .filter(b => b.url);
      const container = document.querySelector('.carrusel-banners-container');
      const puntos = document.querySelector('.carrusel-puntos');
      if (!container || !puntos || banners.length === 0) return;
      container.innerHTML = banners.map((b, i) => `
        <img src="${b.url}" alt="${b.alt}" class="carrusel-banner${i === 0 ? ' activo' : ''}" loading="eager" />
      `).join('');
      puntos.innerHTML = banners.map((_, i) => `
        <button class="carrusel-control-btn${i === 0 ? ' activo' : ''}" aria-label="Ir al banner ${i+1}" tabindex="0"></button>
      `).join('');
      let actual = 0;
      const bannersEls = container.querySelectorAll('.carrusel-banner');
      const puntosEls = puntos.querySelectorAll('.carrusel-control-btn');
      let autoSlide;
      function mostrarBanner(idx) {
        bannersEls.forEach((img, i) => img.classList.toggle('activo', i === idx));
        puntosEls.forEach((btn, i) => btn.classList.toggle('activo', i === idx));
        actual = idx;
        clearInterval(autoSlide);
        autoSlide = setInterval(() => mostrarBanner((actual + 1) % banners.length), 6000);
      }
      document.querySelector('.carrusel-flecha-izq').onclick = () => mostrarBanner((actual - 1 + banners.length) % banners.length);
      document.querySelector('.carrusel-flecha-der').onclick = () => mostrarBanner((actual + 1) % banners.length);
      puntosEls.forEach((btn, i) => btn.onclick = () => mostrarBanner(i));
      autoSlide = setInterval(() => mostrarBanner((actual + 1) % banners.length), 6000);
    });
}
document.addEventListener('DOMContentLoaded', cargarCarruselBanners);

// --- NUEVO CARRUSEL PRINCIPAL ---
async function mostrarCarruselPrincipal() {
  const container = document.querySelector('#carrusel-principal .carrusel-imagenes');
  const controlesContainer = document.querySelector('#carrusel-principal .carrusel-controles');
  if (!container || !controlesContainer) return;
  try {
    const response = await fetch('recursos_visuales.json');
    const data = await response.json();
    const banners = data.filter(b => b.banners_principales && b.banners_principales.startsWith('banners_principal-')).slice(0,5);
    const urls = banners.map(b => b.url_banners_principales);
    if (!urls.length) return;
    container.innerHTML = urls.map((url, i) => `
      <img src="${url}" class="carrusel-banner${i === 0 ? ' activo' : ''}" alt="Banner principal ${i+1}" loading="lazy">
    `).join('');
    controlesContainer.innerHTML = `
      <button class="carrusel-flecha carrusel-flecha-izq" aria-label="Anterior">&#10094;</button>
      <div class="carrusel-puntos">
        ${urls.map((_, i) => `<button class="carrusel-control-btn${i === 0 ? ' activo' : ''}" aria-label="Ver banner ${i+1}" data-index="${i}"></button>`).join('')}
      </div>
      <button class="carrusel-flecha carrusel-flecha-der" aria-label="Siguiente">&#10095;</button>
    `;
    let actual = 0;
    const imgs = container.querySelectorAll('.carrusel-banner');
    const puntos = controlesContainer.querySelectorAll('.carrusel-control-btn');
    const flechaIzq = controlesContainer.querySelector('.carrusel-flecha-izq');
    const flechaDer = controlesContainer.querySelector('.carrusel-flecha-der');
    let intervalo = setInterval(siguienteBanner, 5000);
    function mostrarBanner(idx) {
      imgs.forEach((img, i) => {
        img.classList.toggle('activo', i === idx);
      });
      puntos.forEach((btn, i) => {
        btn.classList.toggle('activo', i === idx);
      });
      actual = idx;
    }
    function siguienteBanner() {
      mostrarBanner((actual + 1) % urls.length);
    }
    function anteriorBanner() {
      mostrarBanner((actual - 1 + urls.length) % urls.length);
    }
    puntos.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        clearInterval(intervalo);
        mostrarBanner(i);
        intervalo = setInterval(siguienteBanner, 5000);
      });
    });
    flechaIzq.addEventListener('click', () => {
      clearInterval(intervalo);
      anteriorBanner();
      intervalo = setInterval(siguienteBanner, 5000);
    });
    flechaDer.addEventListener('click', () => {
      clearInterval(intervalo);
      siguienteBanner();
      intervalo = setInterval(siguienteBanner, 5000);
    });
  } catch (error) {
    console.error('Error cargando banners de bienvenida:', error);
  }
}
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', mostrarCarruselPrincipal);
}

// --- NUEVA GALERÍA CON LIGHTBOX ---
async function mostrarGaleriaLightbox() {
  const galeria = document.querySelector('#galeria-lightbox .galeria-imagenes');
  const modal = document.getElementById('lightbox-modal');
  const lightboxImg = modal.querySelector('.lightbox-img');
  const cerrarBtn = modal.querySelector('.lightbox-cerrar');
  const flechaIzq = modal.querySelector('.lightbox-flecha-izq');
  const flechaDer = modal.querySelector('.lightbox-flecha-der');
  if (!galeria || !modal) return;
  try {
    const response = await fetch('recursos_visuales.json');
    const data = await response.json();
    const banners = data.filter(b => b.banners_principales && b.banners_principales.startsWith('banners_principal-')).slice(0,5);
    const urls = banners.map(b => b.url_banners_principales);
    galeria.innerHTML = urls.map((url, i) => `
      <img src="${url}" class="galeria-thumb" alt="Miniatura ${i+1}" loading="lazy" style="max-width:220px;max-height:120px;margin:12px;cursor:pointer;border-radius:10px;box-shadow:0 2px 8px #00b0fa22;">
    `).join('');
    let actual = 0;
    const thumbs = galeria.querySelectorAll('.galeria-thumb');
    function abrirLightbox(idx) {
      actual = idx;
      lightboxImg.src = urls[actual];
      modal.style.display = 'flex';
      document.body.classList.add('modal-open');
    }
    function cerrarLightbox() {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    function siguiente() {
      actual = (actual + 1) % urls.length;
      lightboxImg.src = urls[actual];
    }
    function anterior() {
      actual = (actual - 1 + urls.length) % urls.length;
      lightboxImg.src = urls[actual];
    }
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => abrirLightbox(i));
    });
    cerrarBtn.addEventListener('click', cerrarLightbox);
    flechaIzq.addEventListener('click', anterior);
    flechaDer.addEventListener('click', siguiente);
    modal.addEventListener('click', e => {
      if (e.target === modal) cerrarLightbox();
    });
    document.addEventListener('keydown', e => {
      if (modal.style.display === 'flex') {
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') anterior();
        if (e.key === 'ArrowRight') siguiente();
      }
    });
  } catch (error) {
    console.error('Error cargando galería lightbox:', error);
  }
}
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', mostrarGaleriaLightbox);
}

// Función de emergencia para configurar buscador manualmente
window.forceSetupSearch = function() {
    console.log("🚨 Configuración manual del buscador...");
    if (window.allProducts && window.allProducts.length > 0) {
        console.log("✅ Productos disponibles, configurando buscador...");
        
        // Buscar la función setupSearchFunctionality en el scope correcto
        const scripts = document.querySelectorAll('script');
        
        // Configurar event listeners directamente
        const searchBar = document.querySelector('.search-bar');
        if (searchBar && !searchBar.hasAttribute('data-listeners-set')) {
            console.log("🔧 Configurando event listeners directamente...");
            
            searchBar.setAttribute('data-listeners-set', 'true');
            
            searchBar.addEventListener('input', function(e) {
                const query = e.target.value.trim();
                console.log("🔍 Búsqueda:", query);
                
                if (query.length < 2) {
                    const suggestions = document.getElementById('search-suggestions');
                    if (suggestions) suggestions.style.display = 'none';
                    return;
                }
                
                // Búsqueda simple
                const results = window.allProducts.filter(product => 
                    product.nombre.toLowerCase().includes(query.toLowerCase()) ||
                    (product.categoria_principal && product.categoria_principal.toLowerCase().includes(query.toLowerCase()))
                ).slice(0, 5);
                
                console.log("🎯 Resultados encontrados:", results.length);
                displaySimpleResults(results, query);
            });
            
            console.log("✅ Event listeners configurados correctamente");
        }
    } else {
        console.error("❌ No hay productos disponibles para la búsqueda");
    }
};

function displaySimpleResults(results, query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions) return;
    
    if (results.length === 0) {
        suggestions.innerHTML = `<div style="padding: 15px; text-align: center; color: #666;">No se encontraron productos para "${query}"</div>`;
        suggestions.style.display = 'block';
        return;
    }
    
    const html = results.map(product => `
        <div style="display: flex; align-items: center; padding: 10px; cursor: pointer; border-bottom: 1px solid #eee;" 
             onclick="alert('Producto: ${product.nombre}')">
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #0d1b2a;">${product.nombre}</div>
                <div style="font-size: 0.9rem; color: #666;">${product.categoria_principal || ''}</div>
            </div>
            <div style="background: #00b0fa; color: white; padding: 4px 8px; border-radius: 10px; font-size: 0.8rem;">Ver</div>
        </div>
    `).join('');
    
    suggestions.innerHTML = html;
    suggestions.style.display = 'block';
}

// 🚀 FUNCIÓN ACTUALIZADA: Enviar backup por email usando Cloudflare Worker
async function sendEmailBackup(cartData) {
    try {
        console.log('📧 Enviando backup por email...', cartData.customer.name);
        
        // URL del Worker que ya creaste y configuraste
        const workerURL = 'https://ingenio-carrito-handler.ingeniored2025.workers.dev/';
        
        const response = await fetch(workerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Email backup enviado correctamente:', result);
            
            // Confirmación silenciosa en consola
            if (result.status === 'success') {
                console.log('📧 Pedido guardado en pedidos.entregas@ingeniored.org');
                console.log('🆔 ID del email:', result.emailId);
            }
        } else {
            const errorText = await response.text();
            console.warn('⚠️ Email backup falló:', response.status, errorText);
        }
    } catch (error) {
        console.warn('⚠️ Error conectando con email backup:', error.message);
        // Silencioso - es solo backup, no interrumpe el flujo principal
    }
}