const fs = require('fs');
const path = require('path');

// Función simple para extraer frontmatter manualmente
function parsearFrontmatter(contenido) {
    const lines = contenido.split('\n');
    if (lines[0] !== '---') return { data: {}, content: contenido };
    
    let endIndex = -1;
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
            endIndex = i;
            break;
        }
    }
    
    if (endIndex === -1) return { data: {}, content: contenido };
    
    const frontmatter = lines.slice(1, endIndex).join('\n');
    const content = lines.slice(endIndex + 1).join('\n');
    
    // Parsear frontmatter simple
    const data = {};
    frontmatter.split('\n').forEach(line => {
        const match = line.match(/^([^:]+):\s*(.+)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            
            // Remover comillas
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            // Convertir booleanos
            if (value === 'true') value = true;
            if (value === 'false') value = false;
            
            data[key] = value;
        }
    });
    
    return { data, content };
}

// Configuración
const noticiasDir = 'content/noticias';
const outputFile = 'assets/js/noticias.json';

// Función para procesar noticias
function procesarNoticias() {
    const noticias = [];
    
    // Verificar si existe el directorio
    if (!fs.existsSync(noticiasDir)) {
        console.log('❌ No existe el directorio de noticias:', noticiasDir);
        return;
    }
    
    // Leer archivos
    const archivos = fs.readdirSync(noticiasDir).filter(file => 
        file.endsWith('.md') || file.endsWith('.mdx')
    );
    
    console.log(`📁 Encontrados ${archivos.length} archivos de noticias`);
    
    archivos.forEach(archivo => {
        try {
            const rutaArchivo = path.join(noticiasDir, archivo);
            const contenido = fs.readFileSync(rutaArchivo, 'utf8');
            const { data, content } = parsearFrontmatter(contenido);
            
            console.log(`📄 Procesando: ${archivo}`);
            console.log(`   - Título: ${data.titulo || 'Sin título'}`);
            console.log(`   - Estado: ${data.estado || 'Sin estado'}`);
            
            // Solo incluir noticias publicadas
            if (data.estado === 'publicado') {
                noticias.push({
                    id: archivo.replace(/\.(md|mdx)$/, ''),
                    titulo: data.titulo || 'Sin título',
                    fecha: data.fecha || new Date().toISOString(),
                    categoria: data.categoria || 'general',
                    imagen: data.imagen || '',
                    resumen: data.resumen || '',
                    destacada: data.destacada === true || data.destacada === 'true',
                    autor: data.autor || 'Colegio Nuevo Horizonte',
                    contenido: content,
                    galeria: data.galeria || []
                });
                console.log(`   ✅ Noticia agregada`);
            } else {
                console.log(`   ⏸️ Noticia omitida (estado: ${data.estado})`);
            }
        } catch (error) {
            console.error(`❌ Error procesando ${archivo}:`, error.message);
        }
    });
    
    // Ordenar por fecha (más recientes primero)
    noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Crear directorio si no existe
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Escribir archivo JSON
    fs.writeFileSync(outputFile, JSON.stringify(noticias, null, 2));
    
    console.log(`\n✅ Procesadas ${noticias.length} noticias`);
    console.log(`📝 Archivo generado: ${outputFile}`);
    
    return noticias;
}

// Ejecutar
procesarNoticias();
