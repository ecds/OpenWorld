import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import SiteMap from "vite-plugin-sitemap";

const robotOption = {
  userAgent: "*",
  [process.env.ROBOTS ?? "allow"]: "/",
};

installGlobals();

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    SiteMap({
      hostname: "https://atlanta.urbanspatialhistory.org/",
      outDir: "public",
      // dynamicRoutes: [...ISLANDS],
      robots: [robotOption],
    }),
  ],
  ssr: {
    target: "node",
    noExternal: ["remix-utils", "maplibre-gl", "three", "d3", "d3-scale"],
  },
});
