// Menu mobile toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mobileMenu.innerHTML = '☰';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(0,0,0,0.9)';
        navLinks.style.padding = '1rem';
        navLinks.style.borderRadius = '0 0 10px 10px';
        mobileMenu.innerHTML = '✕';
    }
}

// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações aos cards quando entram na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards
    const cards = document.querySelectorAll('.feature-card, .command-card, .contact-card, .rules-content');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Fechar menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navLinksContainer = document.querySelector('.nav-links');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (window.innerWidth <= 768) {
                navLinksContainer.style.display = 'none';
                mobileMenu.innerHTML = '☰';
            }
        });
    });

    // Highlight do link ativo baseado na página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Função para copiar texto (útil para comandos)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Criar notificação de sucesso
        const notification = document.createElement('div');
        notification.textContent = 'Copiado!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Adicionar funcionalidade de copiar aos comandos
document.addEventListener('DOMContentLoaded', function() {
    const commandNames = document.querySelectorAll('.command-name');
    commandNames.forEach(command => {
        command.style.cursor = 'pointer';
        command.title = 'Clique para copiar';
        
        command.addEventListener('click', function() {
            const commandText = this.textContent.trim();
            copyToClipboard(commandText);
        });
    });
});

// Animação CSS para notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Funcionalidade de busca (para página de comandos)
function addSearchFunctionality() {
    if (window.location.pathname.includes('comandos')) {
        const searchContainer = document.createElement('div');
        searchContainer.innerHTML = `
            <div style="margin-bottom: 2rem; text-align: center;">
                <input type="text" id="commandSearch" placeholder="Buscar comandos..." 
                       style="padding: 1rem; font-size: 1rem; border: 2px solid #ddd; border-radius: 25px; width: 300px; max-width: 100%;">
            </div>
        `;
        
        const mainSection = document.querySelector('.section');
        if (mainSection) {
            mainSection.insertBefore(searchContainer, mainSection.children[1]);
            
            const searchInput = document.getElementById('commandSearch');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const commandCards = document.querySelectorAll('.command-card');
                
                commandCards.forEach(card => {
                    const commandName = card.querySelector('.command-name').textContent.toLowerCase();
                    const commandDesc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (commandName.includes(searchTerm) || commandDesc.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }
}

// Executar busca quando página carregar
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Efeito de partículas no fundo (opcional, para a página inicial)
function addParticleEffect() {
    if (window.location.pathname.includes('index') || window.location.pathname === '/') {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = '#667eea';
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Executar efeito de partículas
document.addEventListener('DOMContentLoaded', addParticleEffect);
