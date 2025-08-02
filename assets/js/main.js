// === MAIN JAVASCRIPT FUNCTIONALITY ===

class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src], picture source[data-srcset]');
        this.imageObserver = null;
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.loadAllImages();
        }
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        this.images.forEach(img => {
            this.imageObserver.observe(img);
        });
    }
    
    loadImage(img) {
        if (img.tagName === 'IMG') {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        } else if (img.tagName === 'SOURCE') {
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                img.removeAttribute('data-srcset');
            }
        }
        
        img.classList.add('loaded');
        
        img.addEventListener('load', () => {
            img.classList.remove('lazy-image');
        });
    }
    
    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
    }
}

// === SMOOTH SCROLL ===

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    this.scrollToTarget(target);
                }
            });
        });
    }
    
    scrollToTarget(target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// === COUNTER ANIMATION ===

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat__number');
        this.animated = new Set();
        
        this.init();
    }
    
    init() {
        if (this.counters.length > 0) {
            this.setupObserver();
        }
    }
    
    setupObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, options);
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(target * easeOutQuart);
            
            counter.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// === FORM VALIDATION ===

class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            this.setupForm(form);
        });
    }
    
    setupForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
        
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        let isValid = true;
        let errorMessage = '';
        
        // Validación requerido
        if (required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Validaciones específicas por tipo
        if (value && type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, introduce un email válido';
            }
        }
        
        if (value && type === 'tel') {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, introduce un teléfono válido';
            }
        }
        
        this.displayValidation(field, isValid, errorMessage);
        return isValid;
    }
    
    validateForm(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    displayValidation(field, isValid, errorMessage) {
        const wrapper = field.closest('.form__group') || field.parentElement;
        const existingError = wrapper.querySelector('.form__error');
        
        // Remover error existente
        if (existingError) {
            existingError.remove();
        }
        
        // Actualizar clases
        field.classList.toggle('form__input--error', !isValid);
        field.classList.toggle('form__input--valid', isValid && field.value.trim());
        
        // Agregar mensaje de error
        if (!isValid && errorMessage) {
            const errorElement = document.createElement('span');
            errorElement.className = 'form__error';
            errorElement.textContent = errorMessage;
            wrapper.appendChild(errorElement);
        }
    }
    
    clearError(field) {
        const wrapper = field.closest('.form__group') || field.parentElement;
        const existingError = wrapper.querySelector('.form__error');
        
        if (existingError) {
            existingError.remove();
        }
        
        field.classList.remove('form__input--error');
    }
}

// === THEME MANAGER ===

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
    }
    
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
}

// === PERFORMANCE MONITOR ===

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        this.measurePageLoad();
        this.setupResourceObserver();
    }
    
    measurePageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                
                this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
                this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
                this.metrics.firstPaint = performance.getEntriesByType('paint')[0]?.startTime || 0;
                
                this.reportMetrics();
            }, 0);
        });
    }
    
    setupResourceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.duration > 1000) {
                        console.warn(`Recurso lento detectado: ${entry.name} (${entry.duration}ms)`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
    
    reportMetrics() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('📊 Métricas de rendimiento:', this.metrics);
        }
    }
}

// === UTILS ===

const Utils = {
    // Debounce function
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func(...args);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format phone number
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Get device type
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    },
    
    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// === SCROLL TO TOP BUTTON ===

class ScrollToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }
    
    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        button.setAttribute('aria-label', 'Volver arriba');
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--azul);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: var(--transicion-normal);
            z-index: 1000;
            box-shadow: var(--sombra-lg);
        `;
        
        document.body.appendChild(button);
        return button;
    }
    
    init() {
        this.button.addEventListener('click', () => {
            Utils.scrollToTop();
        });
        
        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        }, 100));
    }
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    window.lazyImageLoader = new LazyImageLoader();
    window.smoothScroll = new SmoothScroll();
    window.counterAnimation = new CounterAnimation();
    window.formValidator = new FormValidator();
    window.themeManager = new ThemeManager();
    window.performanceMonitor = new PerformanceMonitor();
    window.scrollToTop = new ScrollToTop();
    
    // Configurar eventos globales
    setupGlobalEvents();
    
    // Mensaje de confirmación para desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎓 Colegio Nuevo Horizonte - Sitio web cargado correctamente');
        console.log('📱 Tipo de dispositivo:', Utils.getDeviceType());
    }
});

// === GLOBAL EVENTS ===

function setupGlobalEvents() {
    // Manejar errores de imágenes
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'assets/img/placeholder.jpg';
            e.target.alt = 'Imagen no disponible';
        }
    }, true);
    
    // Prevenir zoom en iOS en inputs
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (input.style.fontSize !== '16px') {
                    input.style.fontSize = '16px';
                }
            });
        });
    }
    
    // Manejar orientación en dispositivos móviles
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    });
    
    // Service Worker registration (para futuras implementaciones PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // navigator.serviceWorker.register('/sw.js');
        });
    }
}

// === ERROR HANDLING ===

window.addEventListener('error', (e) => {
    console.warn('Error en main.js:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Promise rechazada:', e.reason);
});

// === EXPORT FOR TESTING ===

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LazyImageLoader,
        SmoothScroll,
        CounterAnimation,
        FormValidator,
        ThemeManager,
        Utils
    };
}
