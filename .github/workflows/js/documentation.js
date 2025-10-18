// documentation.js - Funcionalidades para a página de documentação

document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre categorias
    const categoryButtons = document.querySelectorAll('.docs-category');
    const docSections = document.querySelectorAll('.docs-section');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Atualizar botões ativos
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar seção correspondente
            docSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    setTimeout(() => {
                        section.classList.add('active');
                    }, 50);
                }
            });
            
            // Animação de transição
            animateSectionTransition(category);
        });
    });
    
    // Menu lateral
    const menuItems = [
        { title: 'Introdução', category: 'manuals' },
        { title: 'Instalação', category: 'manuals' },
        { title: 'Configuração', category: 'manuals' },
        { title: 'Solução de Problemas', category: 'manuals' },
        { title: 'Protocolos Básicos', category: 'protocols' },
        { title: 'Procedimentos Avançados', category: 'protocols' },
        { title: 'Normas Técnicas', category: 'regulations' }
    ];
    
    const docsMenu = document.getElementById('docs-menu');
    menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.className = 'menu-item';
        menuItem.href = '#';
        menuItem.textContent = item.title;
        menuItem.setAttribute('data-category', item.category);
        
        menuItem.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Ativar categoria correspondente
            categoryButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === category) {
                    btn.click();
                }
            });
            
            // Ativar item do menu
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
        
        docsMenu.appendChild(menuItem);
    });
    
    // Busca na documentação
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            // Simular busca (em implementação real, isso seria uma API)
            alert(`Buscando por: ${searchTerm}\n\nEsta funcionalidade conectaria a uma base de dados de documentação em uma implementação real.`);
            searchInput.value = '';
        }
    }
    
    // Animação de transição entre seções
    function animateSectionTransition(category) {
        const activeSection = document.getElementById(category);
        if (activeSection) {
            const cards = activeSection.querySelectorAll('.doc-card, .protocol-item');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    }
    
    // Inicializar animações
    setTimeout(() => {
        animateSectionTransition('manuals');
    }, 500);
});