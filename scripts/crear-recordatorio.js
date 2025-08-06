const fs = require('fs');
const path = require('path');

// Función para crear fecha en formato ISO
function crearFecha() {
    const ahora = new Date();
    return ahora.toISOString();
}

// Función para crear un recordatorio
function crearRecordatorio() {
    console.log('🎯 Creador de Recordatorios - Colegio Nuevo Horizonte');
    console.log('================================================');
    
    // Solicitar datos básicos
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('📝 Título del recordatorio (ej: "Feriado Nacional - Día de..."): ', (titulo) => {
        rl.question('📅 Fecha del evento (DD/MM/YYYY) o presiona Enter para hoy: ', (fechaInput) => {
            rl.question('⏰ Hora del evento (HH:MM) o presiona Enter para 08:00: ', (hora) => {
                rl.question('📍 Lugar del evento (opcional): ', (lugar) => {
                    rl.question('👥 Dirigido a (ej: "Toda la comunidad educativa"): ', (dirigidoA) => {
                        rl.question('💬 Mensaje principal del director: ', (mensaje) => {
                            rl.question('⚠️ Puntos importantes (separados por | ): ', (puntos) => {
                                
                                // Procesar fecha
                                let fechaEvento = new Date();
                                if (fechaInput.trim()) {
                                    const [dia, mes, ano] = fechaInput.split('/');
                                    fechaEvento = new Date(ano, mes - 1, dia);
                                }
                                
                                // Procesar hora
                                const horaFinal = hora.trim() || '08:00';
                                
                                // Crear nombre de archivo
                                const nombreArchivo = `recordatorio-${titulo.toLowerCase()
                                    .replace(/[^a-z0-9\s]/g, '')
                                    .replace(/\s+/g, '-')
                                    .substring(0, 50)}.mdx`;
                                
                                // Procesar puntos importantes
                                const puntosArray = puntos.split('|').map(p => p.trim()).filter(p => p);
                                const puntosFormateados = puntosArray.map(p => `- ${p}`).join('\n');
                                
                                // Contenido del recordatorio
                                const contenido = `---
titulo: "Recordatorio: ${titulo}"
fecha: ${crearFecha()}
categoria: recordatorios
imagen: "../assets/img/noticias/recordatorio-director.jpg"
resumen: "Comunicado importante sobre ${titulo.toLowerCase()}."
destacada: true
autor: "Dirección - Colegio Nuevo Horizonte"
estado: publicado
tipo: recordatorio
---

# 📢 Recordatorio Importante

**Estimadas familias del Colegio Nuevo Horizonte:**

${mensaje}

## 📅 Información del Evento

- **Fecha**: ${fechaEvento.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- **Hora**: ${horaFinal}${lugar ? `\n- **Lugar**: ${lugar}` : ''}
- **Dirigido a**: ${dirigidoA}

## ⚠️ Importante Recordar

${puntosFormateados || '- Se proporcionarán más detalles próximamente'}

## 📞 Contacto

Para consultas adicionales, pueden comunicarse con:
- **Dirección**: nuevohorizontecolegio87@gmail.com
- **Teléfono**: +595 983 660 286

---

**Atentamente,**  
**Dirección General**  
*Colegio Nuevo Horizonte*`;

                                // Guardar archivo
                                const rutaArchivo = path.join('content/noticias', nombreArchivo);
                                fs.writeFileSync(rutaArchivo, contenido);
                                
                                console.log('✅ Recordatorio creado exitosamente!');
                                console.log(`📄 Archivo: ${nombreArchivo}`);
                                console.log('🔄 Ejecuta "npm run build-noticias" para procesar');
                                
                                rl.close();
                            });
                        });
                    });
                });
            });
        });
    });
}

// Función para crear recordatorio rápido (parámetros por línea de comandos)
function crearRecordatorioRapido() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('❌ Uso: node crear-recordatorio.js "Título" "Mensaje"');
        console.log('📝 Ejemplo: node crear-recordatorio.js "Feriado 15 de Mayo" "Recordamos que mañana es feriado nacional"');
        return;
    }
    
    const titulo = args[0];
    const mensaje = args[1];
    
    const nombreArchivo = `recordatorio-${titulo.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)}.mdx`;
    
    const contenido = `---
titulo: "Recordatorio: ${titulo}"
fecha: ${crearFecha()}
categoria: recordatorios
imagen: "../assets/img/noticias/recordatorio-director.jpg"
resumen: "Comunicado importante sobre ${titulo.toLowerCase()}."
destacada: true
autor: "Dirección - Colegio Nuevo Horizonte"
estado: publicado
tipo: recordatorio
---

# 📢 Recordatorio Importante

**Estimadas familias del Colegio Nuevo Horizonte:**

${mensaje}

## 📅 Información del Evento

- **Fecha**: Se informará próximamente
- **Dirigido a**: Toda la comunidad educativa

## 📞 Contacto

Para consultas adicionales, pueden comunicarse con:
- **Dirección**: nuevohorizontecolegio87@gmail.com
- **Teléfono**: +595 983 660 286

---

**Atentamente,**  
**Dirección General**  
*Colegio Nuevo Horizonte*`;

    const rutaArchivo = path.join('content/noticias', nombreArchivo);
    fs.writeFileSync(rutaArchivo, contenido);
    
    console.log('✅ Recordatorio rápido creado!');
    console.log(`📄 Archivo: ${nombreArchivo}`);
}

// Determinar qué función ejecutar
if (process.argv.includes('--rapido')) {
    crearRecordatorioRapido();
} else {
    crearRecordatorio();
}

module.exports = { crearRecordatorio, crearRecordatorioRapido };
