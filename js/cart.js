// Carrinho de compras
let cart = [];
let cartTotal = 0;

// Elementos do DOM
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Abrir carrinho
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
});

// Fechar carrinho
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Fechar carrinho ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Controles de quantidade
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
        const productId = e.target.getAttribute('data-product');
        const isPlus = e.target.classList.contains('plus');
        const quantityDisplay = document.getElementById(`quantity-${productId}`);
        
        let quantity = parseInt(quantityDisplay.textContent);
        
        if (isPlus) {
            quantity++;
        } else if (quantity > 1) {
            quantity--;
        }
        
        quantityDisplay.textContent = quantity;
        productsData[productId].quantity = quantity;
    }
});

// Adicionar ao carrinho
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.getAttribute('data-product');
        const product = productsData[productId];
        
        // Verificar se o produto já está no carrinho
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // Atualizar quantidade se já estiver no carrinho
            cart[existingItemIndex].quantity += product.quantity;
        } else {
            // Adicionar novo item ao carrinho
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            });
        }
        
        // Resetar quantidade para 1
        document.getElementById(`quantity-${productId}`).textContent = '1';
        productsData[productId].quantity = 1;
        
        // Atualizar display do carrinho
        updateCartDisplay();
        
        // Mostrar mensagem de confirmação
        alert(`${product.quantity} ${product.name} adicionado(s) ao carrinho temporal!`);
    }
});

// Atualizar display do carrinho
function updateCartDisplay() {
    // Limpar carrinho
    cartItems.innerHTML = '';
    
    // Calcular total
    cartTotal = 0;
    let totalItems = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">O carrinho temporal está vazio</div>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;
            totalItems += item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} UT</div>
                </div>
                <div class="cart-item-quantity">
                    <span>Qtd: ${item.quantity}</span>
                </div>
                <div class="cart-item-total">${itemTotal.toFixed(2)} UT</div>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
    }
    
    // Atualizar total e contador
    cartTotalElement.textContent = `${cartTotal.toFixed(2)} UT`;
    cartCount.textContent = totalItems;
}

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('O carrinho temporal está vazio!');
        return;
    }
    
    alert(`Compra temporal realizada com sucesso! Total: ${cartTotal.toFixed(2)} Unidades Temporais`);
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
});