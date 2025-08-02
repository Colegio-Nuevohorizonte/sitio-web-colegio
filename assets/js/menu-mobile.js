// === MENU MOBILE FUNCTIONALITY ===

class MobileMenu {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.body = document.body;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.navToggle && this.navMenu) {
            this.bindEvents();
            this.handleResize();
        }
    }
    
    bindEvents() {
        // Toggle menu al hacer click en hamburguesa
        this.navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Cerrar menu al hacer click en enlaces
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768 && this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });
        
        // Cerrar menu con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
        
        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Prevenir scroll cuando menu está abierto
        this.navMenu.addEventListener('touchmove', (e) => {
            if (this.isMenuOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navMenu.classList.add('show-menu');
        this.navToggle.classList.add('active');
        this.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
        
        // Actualizar aria-expanded para accesibilidad
        this.navToggle.setAttribute('aria-expanded', 'true');
        
        // Focus en el primer enlace del menu
        setTimeout(() => {
            const firstLink = this.navMenu.querySelector('.nav__link');
            if (firstLink) {
                firstLink.focus();
            }
        }, 300);
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('menuOpened'));
    }
    
    closeMenu() {
        this.navMenu.classList.remove('show-menu');
        this.navToggle.classList.remove('active');
        this.body.style.overflow = '';
        this.isMenuOpen = false;
        
        // Actualizar aria-expanded para accesibilidad
        this.navToggle.setAttribute('aria-expanded', 'false');
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('menuClosed'));
    }
    
    handleResize() {
        // Cerrar menu automáticamente en desktop
        if (window.innerWidth >= 768 && this.isMenuOpen) {
            this.closeMenu();
        }
    }
}

// === SCROLL HEADER FUNCTIONALITY ===

class ScrollHeader {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        if (this.header) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase cuando se hace scroll
        if (scrollTop > 10) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Ocultar header al hacer scroll hacia abajo, mostrar al subir
        if (scrollTop > this.lastScrollTop && scrollTop > this.scrollThreshold) {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
}

// === ACTIVE LINK FUNCTIONALITY ===

class ActiveLink {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav__link');
        this.currentPath = window.location.pathname;
        
        this.init();
    }
    
    init() {
        this.setActiveLink();
    }
    
    setActiveLink() {
        this.navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            
            // Obtener el href del enlace
            const linkPath = new URL(link.href).pathname;
            
            // Comparar con la ruta actual
            if (linkPath === this.currentPath || 
                (this.currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('nav__link--active');
            }
            
            // Caso especial para index.html
            if (this.currentPath.endsWith('/') || this.currentPath.endsWith('index.html')) {
                if (link.href.endsWith('/') || link.href.endsWith('index.html')) {
                    link.classList.add('nav__link--active');
                }
            }
        });
    }
}

// === ACCESSIBILITY ENHANCEMENTS ===

class AccessibilityEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }
    
    setupKeyboardNavigation() {
        // Navegación con teclado en el menu
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                }
                
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = index === 0 ? navLinks.length - 1 : index - 1;
                    navLinks[prevIndex].focus();
                }
            });
        });
    }
    
    setupAriaLabels() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle) {
            navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-controls', 'nav-menu');
        }
        
        if (navMenu) {
            navMenu.setAttribute('aria-label', 'Menú de navegación principal');
        }
    }
    
    setupFocusManagement() {
        // Trap focus dentro del menu móvil cuando está abierto
        const navMenu = document.getElementById('nav-menu');
        const focusableElements = 'a[href], button, textarea, input, select';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && navMenu.classList.contains('show-menu')) {
                const focusable = navMenu.querySelectorAll(focusableElements);
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
}

// === PERFORMANCE OPTIMIZATIONS ===

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupPreloadCriticalResources();
    }
    
    setupIntersectionObserver() {
        // Observer para animaciones y lazy loading
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos que necesitan animación
        const elementsToObserve = document.querySelectorAll('.fade-in, .card, .stat');
        elementsToObserve.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupPreloadCriticalResources() {
        // Precargar recursos críticos
        const criticalImages = [
            'assets/img/Lgo-Nuevo-Horizonte.webp',
            'assets/img/hero-image.webp'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// === UTILS ===

const MenuUtils = {
    // Función para cerrar menu al cambiar de página
    closeMenuOnNavigation() {
        const mobileMenu = window.mobileMenuInstance;
        if (mobileMenu && mobileMenu.isMenuOpen) {
            mobileMenu.closeMenu();
        }
    },
    
    // Función para actualizar el enlace activo
    updateActiveLink(newPath) {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.href.includes(newPath)) {
                link.classList.add('nav__link--active');
            }
        });
    },
    
    // Función para obtener el estado del menu
    getMenuState() {
        const mobileMenu = window.mobileMenuInstance;
        return mobileMenu ? mobileMenu.isMenuOpen : false;
    }
};

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    window.mobileMenuInstance = new MobileMenu();
    window.scrollHeaderInstance = new ScrollHeader();
    window.activeLinkInstance = new ActiveLink();
    window.accessibilityInstance = new AccessibilityEnhancements();
    window.performanceInstance = new PerformanceOptimizer();
    
    // Eventos globales
    window.addEventListener('beforeunload', () => {
        MenuUtils.closeMenuOnNavigation();
    });
    
    // Mensaje de confirmación para desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎓 Colegio Nuevo Horizonte - Menu Mobile inicializado correctamente');
    }
});

// === ERROR HANDLING ===

window.addEventListener('error', (e) => {
    console.warn('Error en menu-mobile.js:', e.error);
    
    // Fallback básico si falla el JavaScript
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.onclick = () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
        };
    }
});

// Export para testing (si se usa un bundler)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileMenu,
        ScrollHeader,
        ActiveLink,
        MenuUtils
    };
}
