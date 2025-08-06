const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuración
const noticiasDir = 'content/noticias';
const legacyNoticiasDir = '_noticias';
const outputFile = 'assets/js/noticias.json';

// Función para procesar noticias
function procesarNoticias() {
    const noticias = [];
    
    // Procesar noticias de TinaCMS (content/noticias)
    if (fs.existsSync(noticiasDir)) {
        const archivos = fs.readdirSync(noticiasDir).filter(file => 
            (file.endsWith('.md') || file.endsWith('.mdx')) && !file.startsWith('_')
        );
        
        archivos.forEach(archivo => {
            const contenido = fs.readFileSync(path.join(noticiasDir, archivo), 'utf8');
            const { data, content } = matter(contenido);
            
            // Solo incluir noticias publicadas
            if (data.estado === 'publicado') {
                noticias.push({
                    id: archivo.replace(/\.(md|mdx)$/, ''),
                    titulo: data.titulo,
                    fecha: data.fecha,
                    categoria: data.categoria,
                    imagen: data.imagen,
                    resumen: data.resumen,
                    destacada: data.destacada || false,
                    autor: data.autor,
                    contenido: content,
                    galeria: data.galeria || []
                });
            }
        });
    }
    
    // Procesar noticias legacy (_noticias) para compatibilidad
    if (fs.existsSync(legacyNoticiasDir)) {
        const archivosLegacy = fs.readdirSync(legacyNoticiasDir).filter(file => file.endsWith('.md'));
        
        archivosLegacy.forEach(archivo => {
            const contenido = fs.readFileSync(path.join(legacyNoticiasDir, archivo), 'utf8');
            const { data, content } = matter(contenido);
            
            // Solo incluir noticias publicadas
            if (data.estado === 'publicado') {
                noticias.push({
                    id: archivo.replace('.md', ''),
                    titulo: data.titulo,
                    fecha: data.fecha,
                    categoria: data.categoria,
                    imagen: data.imagen,
                    resumen: data.resumen,
                    destacada: data.destacada || false,
                    autor: data.autor,
                    contenido: content,
                    galeria: data.galeria || []
                });
            }
        });
    }
    
    // Remover duplicados por ID
    const noticiasUnicas = noticias.filter((noticia, index, self) => 
        index === self.findIndex(n => n.id === noticia.id)
    );
    
    // Ordenar por fecha (más recientes primero)
    noticiasUnicas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Crear directorio si no existe
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Escribir archivo JSON
    fs.writeFileSync(outputFile, JSON.stringify(noticiasUnicas, null, 2));
    
    console.log(`✅ Procesadas ${noticiasUnicas.length} noticias`);
    console.log(`📝 Archivo generado: ${outputFile}`);
    
    return noticiasUnicas;
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    procesarNoticias();
}

module.exports = procesarNoticias;
