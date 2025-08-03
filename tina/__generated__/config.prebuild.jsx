// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: "83be6128-79a5-4658-8e2a-6f5e60de07e0",
  token: "662651dd02eaff2fb815d9fc480baebedd681067",
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
        fields: [
          {
            type: "string",
            name: "titulo",
            label: "T\xEDtulo",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "fecha",
            label: "Fecha",
            required: true
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
              component: "textarea"
            }
          },
          {
            type: "boolean",
            name: "destacada",
            label: "\xBFEs destacada?"
          },
          {
            type: "string",
            name: "autor",
            label: "Autor",
            required: true
          },
          {
            type: "string",
            name: "estado",
            label: "Estado",
            required: true,
            options: [
              { value: "borrador", label: "Borrador" },
              { value: "publicado", label: "Publicado" }
            ]
          },
          {
            type: "rich-text",
            name: "contenido",
            label: "Contenido",
            isBody: true,
            required: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
