// RESPALDO DEL CÓDIGO ORIGINAL DEL CARRITO - 21 JULIO 2025
// Este archivo contiene el código del carrito antes de las mejoras profesionales

// FUNCIONES ORIGINALES DEL CARRITO:

function addToCart(productId) {
    const productToAdd = allProducts.find(p => p.id_del_producto == productId);
    if (!productToAdd || productToAdd.stock <= 0) {
        showToast('Este producto no está disponible.', 'error');
        return;
    }
    const isAlreadyInCart = cart.some(item => item.id_del_producto == productId);
    if (isAlreadyInCart) {
        showToast('Este producto ya está en tu carrito.', 'error');
        return;
    }
    cart.push(productToAdd);
    localStorage.setItem('ingenioCart', JSON.stringify(cart));
    updateCartUI();
    showToast(`"${productToAdd.nombre_producto}" fue añadido al carrito.`);
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    if (!cartContainer || !cartCount) return;
    const totalItems = cart.reduce((sum, item) => sum + (item.cantidad || 1), 0);
    cartCount.textContent = totalItems;
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-state-message">Tu carrito está vacío.</p>`;
    } else {
        let total = 0;
        cartContainer.innerHTML = cart.map(item => {
            const price = parseFloat(String(item.precio_final).replace(/\./g, '').replace(',', '.')) || 0;
            const subtotal = price * (item.cantidad || 1);
            total += subtotal;
            return `
                <div class="cart-item">
                    <img src="${item.imagen_principal}" alt="${item.nombre_producto}" loading="lazy">
                    <div class="item-details">
                        <p>${item.nombre_producto}</p>
                        <div class="quantity-controls">
                            <button class="decrease-qty-btn" data-id="${item.id_del_producto}" aria-label="Disminuir cantidad">-</button>
                            <span>${item.cantidad || 1}</span>
                            <button class="increase-qty-btn" data-id="${item.id_del_producto}" aria-label="Aumentar cantidad">+</button>
                        </div>
                        <p class="item-price">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)} x ${item.cantidad || 1}</p>
                        <p class="item-subtotal"><strong>Subtotal:</strong> ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(subtotal)}</p>
                        <button class="remove-from-cart-btn" data-id="${item.id_del_producto}" aria-label="Eliminar ${item.nombre_producto} del carrito">Eliminar</button>
                    </div>
                </div>
            `;
        }).join('');
        cartContainer.innerHTML += `<div class="cart-total"><strong>Total:</strong> <span id="cart-total-value">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total)}</span></div>`;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id_del_producto != productId);
    localStorage.setItem('ingenioCart', JSON.stringify(cart));
    updateCartUI();
    showToast('Producto eliminado del carrito.', 'error');
}

function generateWhatsAppMessage() {
    const customerNameInput = document.getElementById('customer-name');
    const customerLocationInput = document.getElementById('customer-location');
    const customerEmailInput = document.getElementById('customer-email');

    const customerName = customerNameInput.value.trim();
    const customerLocation = customerLocationInput.value.trim();
    const customerEmail = customerEmailInput.value.trim();

    if (customerName === "" || customerLocation === "" || customerEmail === "") {
        showToast('Por favor, completa todos los datos.', 'error');
        return;
    }
    if (cart.length === 0) {
        showToast('Tu carrito está vacío.', 'error');
        return;
    }
    const header = `¡Hola Ingenio Red! 👋 Quisiera realizar un pedido con los siguientes datos:\n\n*Cliente:* ${customerName}\n*Ubicación:* ${customerLocation}\n*Correo:* ${customerEmail}\n\n*Productos del Pedido:*\n`;
    const productList = cart.map((item, index) => `${index + 1}. ${item.nombre_producto} (SKU: ${item.sku})`).join('\n');
    const footer = "\n\nQuedo atento a la confirmación y los pasos a seguir. ¡Gracias!";
    const fullMessage = encodeURIComponent(header + productList + footer);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${fullMessage}`;
    window.open(whatsappURL, '_blank');
}