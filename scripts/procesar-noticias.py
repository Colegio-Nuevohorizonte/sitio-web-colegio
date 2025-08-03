import os
import json
import re
from datetime import datetime

def parsear_frontmatter(contenido):
    """Extrae el frontmatter y el contenido de un archivo markdown/mdx"""
    lines = contenido.split('\n')
    
    if not lines or lines[0].strip() != '---':
        return {}, contenido
    
    # Buscar el final del frontmatter
    end_index = -1
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end_index = i
            break
    
    if end_index == -1:
        return {}, contenido
    
    # Extraer frontmatter y contenido
    frontmatter_lines = lines[1:end_index]
    content = '\n'.join(lines[end_index + 1:])
    
    # Parsear frontmatter
    data = {}
    for line in frontmatter_lines:
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()
            
            # Remover comillas
            if (value.startswith('"') and value.endswith('"')) or \
               (value.startswith("'") and value.endswith("'")):
                value = value[1:-1]
            
            # Convertir booleanos
            if value.lower() == 'true':
                value = True
            elif value.lower() == 'false':
                value = False
            
            data[key] = value
    
    return data, content

def procesar_noticias():
    """Procesa todas las noticias y genera el archivo JSON"""
    noticias_dir = 'content/noticias'
    output_file = 'assets/js/noticias.json'
    
    # Verificar si existe el directorio
    if not os.path.exists(noticias_dir):
        print(f'❌ No existe el directorio de noticias: {noticias_dir}')
        return
    
    noticias = []
    
    # Buscar archivos de noticias
    archivos = [f for f in os.listdir(noticias_dir) if f.endswith(('.md', '.mdx'))]
    
    print(f'📁 Encontrados {len(archivos)} archivos de noticias')
    
    for archivo in archivos:
        try:
            ruta_archivo = os.path.join(noticias_dir, archivo)
            
            # Leer archivo
            with open(ruta_archivo, 'r', encoding='utf-8') as f:
                contenido = f.read()
            
            # Parsear frontmatter
            data, content = parsear_frontmatter(contenido)
            
            print(f'📄 Procesando: {archivo}')
            print(f'   - Título: {data.get("titulo", "Sin título")}')
            print(f'   - Estado: {data.get("estado", "Sin estado")}')
            
            # Solo incluir noticias publicadas
            if data.get('estado') == 'publicado':
                noticia = {
                    'id': archivo.replace('.md', '').replace('.mdx', ''),
                    'titulo': data.get('titulo', 'Sin título'),
                    'fecha': data.get('fecha', datetime.now().isoformat()),
                    'categoria': data.get('categoria', 'general'),
                    'imagen': data.get('imagen', ''),
                    'resumen': data.get('resumen', ''),
                    'destacada': data.get('destacada', False),
                    'autor': data.get('autor', 'Colegio Nuevo Horizonte'),
                    'contenido': content,
                    'galeria': data.get('galeria', [])
                }
                
                noticias.append(noticia)
                print('   ✅ Noticia agregada')
            else:
                print(f'   ⏸️ Noticia omitida (estado: {data.get("estado", "sin estado")})')
                
        except Exception as e:
            print(f'❌ Error procesando {archivo}: {str(e)}')
    
    # Ordenar por fecha (más recientes primero)
    noticias.sort(key=lambda x: x['fecha'], reverse=True)
    
    # Crear directorio si no existe
    output_dir = os.path.dirname(output_file)
    os.makedirs(output_dir, exist_ok=True)
    
    # Escribir archivo JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(noticias, f, indent=2, ensure_ascii=False)
    
    print(f'\n✅ Procesadas {len(noticias)} noticias')
    print(f'📝 Archivo generado: {output_file}')
    
    return noticias

if __name__ == '__main__':
    procesar_noticias()
