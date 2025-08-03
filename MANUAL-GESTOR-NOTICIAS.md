# Manual del Gestor de Noticias - Colegio Nuevo Horizonte

## 📝 Cómo crear una nueva noticia

### 1. Crear el archivo de noticia

**Ubicación:** `content/noticias/`
**Formato:** `nombre-de-la-noticia.mdx`
**Ejemplo:** `bienvenida-sitio-web.mdx`

### 2. Estructura del archivo MDX

```mdx
---
titulo: "¡Bienvenidos a nuestro nuevo sitio web!"
fecha: 2025-08-03T10:00:00.000Z
categoria: eventos
imagen: "../assets/img/noticias/nuevo-sitio-web.jpg"
resumen: "Nos complace presentar nuestro renovado sitio web con nuevas funcionalidades para toda la comunidad educativa."
destacada: true
autor: "Colegio Nuevo Horizonte"
estado: publicado
---

El contenido de la noticia va aquí...

## Puede usar títulos

### Y subtítulos

- Listas
- Con viñetas

1. Listas numeradas
2. También funcionan

**Texto en negrita** y *cursiva*

Para más información, contacta con nosotros en info@colegionuevohorizonte.edu.py
```

### 3. Campos obligatorios del frontmatter

- **titulo:** Título principal de la noticia
- **fecha:** Fecha en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
- **categoria:** eventos, academico, deportes, actividades, etc.
- **imagen:** Ruta a la imagen principal
- **resumen:** Descripción corta para mostrar en listados
- **destacada:** true/false (si aparece en destacados)
- **autor:** Quien escribió la noticia
- **estado:** publicado/borrador

### 4. Gestión de imágenes

**Ubicación:** `assets/img/noticias/`
**Formatos permitidos:** JPG, PNG, WebP
**Tamaño recomendado:** 800x400px
**Peso máximo:** 500KB

**Nomenclatura:**
- `evento-graduacion-2025.jpg`
- `nueva-infraestructura.jpg`
- `torneo-deportivo-marzo.jpg`

### 5. Proceso completo para publicar

1. **Crear la noticia:** Archivo MDX en `content/noticias/`
2. **Subir imágenes:** En `assets/img/noticias/`
3. **Procesar noticias:** Ejecutar `python scripts/procesar-noticias.py`
4. **Subir cambios a Git:**
   ```bash
   git add .
   git commit -m "📝 Nueva noticia: [título]"
   git push
   ```
5. **Esperar:** 2-10 minutos para que se actualice el sitio

### 6. Categorías recomendadas

- `eventos` - Ceremonias, celebraciones, actos especiales
- `institucional` - Comunicados oficiales, anuncios importantes
- `actividades` - Extraescolares, talleres, proyectos especiales

### 7. Tips para escribir noticias

- **Título:** Claro y llamativo (máximo 60 caracteres)
- **Resumen:** 1-2 líneas que capture la esencia
- **Contenido:** Usar markdown para formato
- **Imágenes:** Alta calidad y relacionadas al contenido
- **Fecha:** Siempre usar la fecha real del evento

### 8. Ejemplos de fechas

```
Evento hoy: 2025-08-03T10:00:00.000Z
Evento ayer: 2025-08-02T14:30:00.000Z
Evento futuro: 2025-08-15T09:00:00.000Z
```

### 9. Comandos útiles

**Ver estado del servidor:**
```bash
python -m http.server 8000
```

**Procesar noticias:**
```bash
python scripts/procesar-noticias.py
```

**Subir cambios:**
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

### 10. Solución de problemas

**Si la noticia no aparece:**
1. Verificar que `estado: publicado`
2. Ejecutar el script de procesamiento
3. Revisar que la imagen exista
4. Verificar formato del frontmatter

**Si hay errores:**
1. Revisar que no falten comillas en el frontmatter
2. Verificar que la fecha esté en formato correcto
3. Asegurarse que la imagen esté en la ruta correcta
