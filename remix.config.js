// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server. The CLI will eventually
// stop passing in HOST, so we can remove this workaround after the next major release.


/** @type {import('@remix-run/dev').AppConfig} */
//module.exports = {
//  ignoredRouteFiles: ["**/.*"],
//  appDirectory: "app",
//  serverModuleFormat: "cjs",
//  dev: { port: process.env.HMR_SERVER_PORT || 8002 },
//  future: {},
//};


import path from "node:path";

if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{js,jsx,ts,tsx}"],
  publicPath: "/_static/build/",
  server: "server.ts",
  serverBuildPath: "server/index.mjs",
  serverModuleFormat: "esm",
  routes: (defineRoutes) =>
    defineRoutes((route) => {
      if (process.env.NODE_ENV === "production") return;

      console.log("⚠️  Test routes enabled.");

      const appDir = path.join(process.cwd(), "app");

      route(
        "__tests/create-user",
        path.relative(appDir, "cypress/support/test-routes/create-user.ts"),
      );
    }),
};
