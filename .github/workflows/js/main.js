// Dados dos produtos
const productsData = {
    1: { 
        name: "Fones de Ouvido Temporais", 
        price: 299.99, 
        quantity: 1,
        category: "headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        id: "T-1971-OS-01",
        description: ["Cancelamento de ruído dimensional ativo.", "Isolamento acústico para variações de linha do tempo."]
    },
    2: { 
        name: "Sistema de Som Dimensional", 
        price: 449.99, 
        quantity: 1,
        category: "speakers",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        id: "T-1984-OS-02",
        description: ["Projeção acústica através de realidades.", "Compatível com tecnologia TemPad."]
    },
    3: { 
        name: "Console de Áudio Temporal", 
        price: 1299.99, 
        quantity: 1,
        category: "consoles",
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        id: "T-1999-OS-03",
        description: ["Controle centralizado de sistemas de som multitemporais.", "Interface TVA."]
    },
    4: { 
        name: "Microfone de Realidade", 
        price: 199.99, 
        quantity: 1,
        category: "microphones",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        id: "T-1965-OS-04",
        description: ["Captura de áudio através de dimensões paralelas.", "Filtro temporal integrado."]
    },
    5: { 
        name: "Amplificador Quântico", 
        price: 599.99, 
        quantity: 1,
        category: "speakers",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        id: "T-1978-OS-05",
        description: ["Amplificação de sinal através do vácuo quântico.", "Distorção temporal zero."]
    },
    6: { 
        name: "Mixer Temporal", 
        price: 899.99, 
        quantity: 1,
        category: "consoles",
        image: "https://images.unsplash.com/photo-1589002568482-9aa0493c63a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        id: "T-1989-OS-06",
        description: ["Mixagem de áudio através de diferentes eras.", "Sincronização temporal."]
    }
};

// Função para renderizar produtos
function renderProducts() {
    const productScroll = document.getElementById('product-scroll');
    productScroll.innerHTML = '';

    Object.keys(productsData).forEach(productId => {
        const product = productsData[productId];
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="file-tab">APROVADO</div>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-id">REF: ${product.id}</div>
            <h3>${product.name}</h3>
            ${product.description.map(desc => `<p>${desc}</p>`).join('')}
            <div class="product-price">${product.price.toFixed(2)} UT</div>
            <div class="product-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-product="${productId}">-</button>
                    <span class="quantity-display" id="quantity-${productId}">1</span>
                    <button class="quantity-btn plus" data-product="${productId}">+</button>
                </div>
                <button class="cta-button add-to-cart" data-product="${productId}">ADICIONAR</button>
            </div>
        `;
        
        productScroll.appendChild(productCard);
    });
    
    // Criar indicadores de scroll após renderizar produtos
    createScrollIndicators();
}

// Função para criar indicadores de scroll
function createScrollIndicators() {
    const scrollIndicators = document.getElementById('scroll-indicators');
    const productScroll = document.getElementById('product-scroll');
    const productCards = document.querySelectorAll('.product-card:not([style*="display: none"])');
    
    // Limpar indicadores existentes
    scrollIndicators.innerHTML = '';
    
    // Calcular quantos indicadores são necessários
    const containerWidth = productScroll.parentElement.offsetWidth;
    const cardWidth = 280 + 20; // largura do card + gap
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const totalCards = productCards.length;
    const totalIndicators = Math.ceil(totalCards / visibleCards);
    
    // Criar indicadores
    for (let i = 0; i < totalIndicators; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        if (i === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            scrollToProductSection(i);
        });
        
        scrollIndicators.appendChild(indicator);
    }
}

// Função para rolar para uma seção específica de produtos
function scrollToProductSection(sectionIndex) {
    const productScroll = document.getElementById('product-scroll');
    const containerWidth = productScroll.parentElement.offsetWidth;
    const cardWidth = 280 + 20; // largura do card + gap
    const scrollPosition = sectionIndex * containerWidth;
    
    productScroll.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    // Atualizar indicadores ativos
    updateActiveIndicator(sectionIndex);
}

// Função para atualizar indicador ativo
function updateActiveIndicator(index) {
    const indicators = document.querySelectorAll('.scroll-indicator');
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Função para filtrar produtos
function filterProducts(filter) {
    const allProducts = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Atualizar botões ativos
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filtrar produtos
    allProducts.forEach(product => {
        if (filter === 'all' || product.getAttribute('data-category') === filter) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Recriar indicadores após filtrar
    setTimeout(() => {
        createScrollIndicators();
    }, 300);
}

// Inicializar produtos e funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Adicionar event listeners para filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
    
    // Adicionar event listeners para setas de scroll
    const scrollLeft = document.getElementById('scroll-left');
    const scrollRight = document.getElementById('scroll-right');
    const productScroll = document.getElementById('product-scroll');
    
    scrollLeft.addEventListener('click', () => {
        productScroll.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    scrollRight.addEventListener('click', () => {
        productScroll.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Atualizar indicadores ativos durante o scroll
    productScroll.addEventListener('scroll', () => {
        const containerWidth = productScroll.parentElement.offsetWidth;
        const scrollPosition = productScroll.scrollLeft;
        const currentSection = Math.round(scrollPosition / containerWidth);
        
        updateActiveIndicator(currentSection);
    });
    
    // Controles de quantidade nos produtos
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
});