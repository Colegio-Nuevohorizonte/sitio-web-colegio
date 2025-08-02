# Sitio Web del Colegio - Responsive

## Descripción
Sitio web responsive para un colegio desarrollado con HTML5, CSS3 y JavaScript vanilla, siguiendo el enfoque Mobile-First.

## Características

### Estructura
- **Página principal** (`index.html`): Hero section, cards destacadas y footer
- **Subpáginas**:
  - `pages/institucional.html`: Información del colegio
  - `pages/academico.html`: Oferta académica
  - `pages/infraestructura.html`: Galería de instalaciones
  - `pages/contacto.html`: Formulario de contacto y ubicación

### Diseño Responsive
- **Mobile-First**: Diseño optimizado desde 320px
- **Breakpoints**:
  - Móvil: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- **Menú hamburguesa** en dispositivos móviles

### Funcionalidades
- Formulario de contacto funcional (FormSubmit)
- Galería de imágenes con Swiper.js
- Mapa interactivo
- Lazy loading de imágenes
- Animaciones suaves

### Tecnologías
- HTML5 semántico
- CSS3 con variables customizadas
- JavaScript ES6+
- Swiper.js para galerías
- Intersection Observer API para lazy loading

## Estructura de archivos
```
├── index.html
├── pages/
│   ├── academico.html
│   ├── contacto.html
│   ├── infraestructura.html
│   └── institucional.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── header.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   └── menu-mobile.js
│   ├── img/
│   └── fonts/
└── README.md
```

## Instalación y uso
1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. Para desarrollo local, se recomienda usar Live Server

## Optimizaciones
- Imágenes en formato WebP con fallback
- Lazy loading implementado
- CSS minificado para producción
- Código semántico y accesible