/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  publicPath: "/_static/build/",
  serverBuildPath: "server/index.js",
  future: {
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
  },
  serverDependenciesToBundle: [
    "maplibre-gl"
  ]
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
