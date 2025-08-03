#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Script para crear noticias fácilmente
function crearNoticia() {
    const fecha = new Date().toISOString();
    const template = `---
titulo: "Nueva Noticia - ${new Date().toLocaleDateString()}"
fecha: ${fecha}
categoria: eventos
imagen: "../assets/img/noticias/placeholder.jpg"
resumen: "Descripción breve de la noticia"
destacada: false
autor: "Colegio Nuevo Horizonte"
estado: borrador
---

# Nueva Noticia

Contenido de la noticia aquí...

## Sección 1

Más contenido...
`;

    const filename = `noticia-${Date.now()}.mdx`;
    const filepath = path.join('content', 'noticias', filename);
    
    fs.writeFileSync(filepath, template);
    console.log(`✅ Noticia creada: ${filename}`);
}

if (require.main === module) {
    crearNoticia();
}

module.exports = { crearNoticia };
