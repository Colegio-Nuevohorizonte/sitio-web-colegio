// tina/config.ts
import { defineConfig } from "tinacms";
var branch = "main";
var config_default = defineConfig({
  branch,
  clientId: "ee46aae1-9487-4d53-9950-2cf9d71a40ba",
  // Get this from tina.io
  token: "4dcf8f2a172d5defd8959423c48e98cd6f86aaed",
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "assets/img/noticias",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      {
        name: "noticias",
        label: "Noticias",
        path: "content/noticias",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/noticias/${document._sys.filename}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "T\xEDtulo de la Noticia",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "fecha",
            label: "Fecha de Publicaci\xF3n",
            required: true,
            ui: {
              dateFormat: "DD/MM/YYYY"
            }
          },
          {
            type: "string",
            name: "categoria",
            label: "Categor\xEDa",
            required: true,
            options: [
              { value: "academico", label: "Acad\xE9mico" },
              { value: "deportes", label: "Deportes" },
              { value: "eventos", label: "Eventos" },
              { value: "reconocimientos", label: "Reconocimientos" }
            ]
          },
          {
            type: "image",
            name: "imagen",
            label: "Imagen Principal",
            required: true
          },
          {
            type: "string",
            name: "resumen",
            label: "Resumen",
            required: true,
            ui: {
              component: "textarea",
              validate: (value) => {
                if (value && value.length > 200) {
                  return "El resumen no puede tener m\xE1s de 200 caracteres";
                }
              }
            }
          },
          {
            type: "boolean",
            name: "destacada",
            label: "\xBFEs noticia destacada?",
            description: "Las noticias destacadas aparecen en la secci\xF3n principal"
          },
          {
            type: "string",
            name: "autor",
            label: "Autor",
            required: true,
            ui: {
              defaultValue: "Colegio Nuevo Horizonte"
            }
          },
          {
            type: "string",
            name: "estado",
            label: "Estado",
            required: true,
            options: [
              { value: "borrador", label: "Borrador" },
              { value: "publicado", label: "Publicado" },
              { value: "archivado", label: "Archivado" }
            ],
            ui: {
              defaultValue: "borrador"
            }
          },
          {
            type: "rich-text",
            name: "contenido",
            label: "Contenido de la Noticia",
            isBody: true,
            required: true
          },
          {
            type: "object",
            name: "galeria",
            label: "Galer\xEDa de Im\xE1genes (Opcional)",
            list: true,
            fields: [
              {
                type: "image",
                name: "imagen",
                label: "Imagen"
              },
              {
                type: "string",
                name: "alt",
                label: "Descripci\xF3n de la imagen"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
