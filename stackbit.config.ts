import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["blog/blog_entries"],
      models: [
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
            { name: "tags", type: "list", required: false },
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
  ]
}); 