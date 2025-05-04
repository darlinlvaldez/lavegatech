function cargarCarrito() {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartList = document.getElementById('cart-list');
    const carritoCount = document.getElementById('carrito-count');
    const cartSummary = document.getElementById('cart-summary');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    if (carrito.length === 0) {
        if (cartList) cartList.innerHTML = '<p>No hay productos en el carrito.</p>';
        if (carritoCount) carritoCount.textContent = 0;
        if (cartSummary) cartSummary.textContent = '0 producto(s) seleccionado(s)';
        if (cartSubtotal) cartSubtotal.textContent = 'SUBTOTAL: $0.00';
    } else {
        let total = 0;
        if (cartList) cartList.innerHTML = '';
        carrito.forEach(item => {                                               

            let precioConDescuento = item.precio;
            if (item.descuento > 0) {
                precioConDescuento = item.precio * (1 - item.descuento / 100);  
            }
            total += precioConDescuento * item.cantidad;

            if (cartList) {
                cartList.innerHTML += `
                    <div class="product-widget">
                        <a href="/product/${item.id}${item.colorSeleccionado ? `?color=${encodeURIComponent(item.colorSeleccionado)}` : ''}">
                            <div class="product-img">
                                <img src="${item.imagen}" alt="${item.nombre}">
                            </div>
                            <div class="product-body">
                                <h3 class="product-nombres">${item.nombre}</h3></a>
                                <h4 class="product-precios">
                                    <span class="qty-cart">${item.cantidad}x</span> 
                                    $${precioConDescuento.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                </h4>
                            </div>
                    <button class="delete" onclick="deleteProduct('${item.id}', '${item.colorSeleccionado}')"><i class="fa fa-close"></i></button>
                    </div>
                `;
            }
        });

        if (carritoCount) carritoCount.textContent = carrito.length;
        if (cartSummary) cartSummary.textContent = `${carrito.length} producto(s) seleccionado(s)`;
        if (cartSubtotal) cartSubtotal.textContent = `SUBTOTAL: $${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
}