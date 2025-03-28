import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~2.1.14",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content", "blog/blog_entries"],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "content", type: "markdown", required: true }
          ]
        },
        {
          name: "BlogPost",
          type: "page",
          urlPath: "/blog/{slug}",
          filePath: "blog/blog_entries/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "date", type: "datetime", required: true },
            { name: "thumbnail", type: "image", required: false },
            { name: "description", type: "text", required: true },
            { name: "body", type: "markdown", required: true },
            { 
              name: "tags", 
              type: "list", 
              required: false,
              items: { type: "string" }
            },
            { name: "author", type: "string", required: false },
            { name: "featured", type: "boolean", default: false },
            { name: "readingTime", type: "number", required: false },
            { name: "category", type: "enum", options: ["Automatización", "IA", "Tecnología", "Negocios", "Otros"], required: true }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "blog/assets",
        uploadDir: "images",
        publicPath: "/blog/assets"
      }
    })
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page");

    return documents
      .filter((d) => pageModels.some(m => m.name === d.modelName))
      .map((document) => {
        const urlModel = document.modelName === 'Page' ? 'pages' : 'blog';
        const documentData = document as { id: string; modelName: string; slug?: string };
        
        return {
          stableId: document.id,
          urlPath: `/${urlModel}/${documentData.slug || document.id}`,
          document,
          isHomePage: documentData.slug === 'index'
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  }
}); 