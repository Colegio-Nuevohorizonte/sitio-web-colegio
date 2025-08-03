import os
from datetime import datetime

def crear_nueva_noticia():
    """Script interactivo para crear una nueva noticia"""
    
    print("🌟 CREADOR DE NOTICIAS - COLEGIO NUEVO HORIZONTE 🌟\n")
    
    # Recopilar información
    titulo = input("📝 Título de la noticia: ")
    
    print("\n📂 Categorías disponibles:")
    categorias = ["eventos", "institucional", "actividades"]
    for i, cat in enumerate(categorias, 1):
        print(f"  {i}. {cat}")
    
    while True:
        try:
            cat_num = int(input("\nSelecciona número de categoría: "))
            if 1 <= cat_num <= len(categorias):
                categoria = categorias[cat_num - 1]
                break
            else:
                print("❌ Número inválido. Intenta de nuevo.")
        except ValueError:
            print("❌ Por favor ingresa un número válido.")
    
    resumen = input("\n📄 Resumen (1-2 líneas): ")
    
    nombre_imagen = input("\n🖼️  Nombre del archivo de imagen (ej: evento-graduacion.jpg): ")
    
    destacada = input("\n⭐ ¿Es noticia destacada? (s/n): ").lower().startswith('s')
    
    autor = input("\n✍️  Autor (presiona Enter para usar 'Colegio Nuevo Horizonte'): ") or "Colegio Nuevo Horizonte"
    
    # Generar nombre de archivo
    nombre_archivo = titulo.lower()
    nombre_archivo = nombre_archivo.replace(" ", "-")
    nombre_archivo = "".join(c for c in nombre_archivo if c.isalnum() or c in "-_")
    nombre_archivo += ".mdx"
    
    # Generar fecha actual
    fecha_actual = datetime.now().isoformat() + "Z"
    
    # Crear contenido del archivo
    contenido = f'''---
titulo: "{titulo}"
fecha: {fecha_actual}
categoria: {categoria}
imagen: "../assets/img/noticias/{nombre_imagen}"
resumen: "{resumen}"
destacada: {str(destacada).lower()}
autor: "{autor}"
estado: publicado
---

# {titulo}

[Escribe aquí el contenido de la noticia]

## Subtítulo de ejemplo

Contenido de la noticia...

### Información adicional

- Punto importante 1
- Punto importante 2
- Punto importante 3

---

*Para más información, contacta con nosotros en info@colegionuevohorizonte.edu.py*
'''
    
    # Crear directorio si no existe
    directorio = "content/noticias"
    os.makedirs(directorio, exist_ok=True)
    
    # Escribir archivo
    ruta_archivo = os.path.join(directorio, nombre_archivo)
    
    with open(ruta_archivo, 'w', encoding='utf-8') as f:
        f.write(contenido)
    
    print(f"\n✅ ¡Noticia creada exitosamente!")
    print(f"📁 Archivo: {ruta_archivo}")
    print(f"\n📋 Próximos pasos:")
    print(f"1. Edita el contenido en: {ruta_archivo}")
    print(f"2. Sube la imagen: assets/img/noticias/{nombre_imagen}")
    print(f"3. Ejecuta: python scripts/procesar-noticias.py")
    print(f"4. Sube los cambios con Git")
    print(f"\n🎯 ¡No olvides agregar la imagen en assets/img/noticias/!")

if __name__ == "__main__":
    crear_nueva_noticia()
