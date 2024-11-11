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
    noExternal: [
      "remix-utils",
      "maplibre-gl",
      "three",
      "d3",
      "d3-scale",
      "d3-array",
      "d3-axis",
      "d3-brush",
      "d3-chord",
      "d3-color",
      "d3-contour",
      "d3-delaunay",
      "d3-dispatch",
      "d3-drag",
      "d3-dsv",
      "d3-ease",
      "d3-fetch",
      "d3-force",
      "d3-format",
      "d3-geo",
      "d3-hierarchy",
      "d3-interpolate",
      "d3-path",
      "d3-polygon",
      "d3-quadtree",
      "d3-random",
      "d3-scale",
      "d3-scale-chromatic",
      "d3-selection",
      "d3-shape",
      "d3-time",
      "d3-time-format",
      "d3-timer",
      "d3-transition",
      "d3-zoom",
    ],
  },
});
