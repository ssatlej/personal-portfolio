import { defineConfig } from "nitro/config";

export default defineConfig({
  preset: "cloudflare-pages",
  entry: "src/server.ts",
});
