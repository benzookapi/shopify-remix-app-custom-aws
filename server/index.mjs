var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x, {
  get: (a, b) => (typeof require < "u" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require < "u")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// server.ts
import { createRequestHandler } from "@remix-run/architect";

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isbot } from "isbot";

// app/shopify.server.js
import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";

// app/db.server.js
import { PrismaClient } from "@architect/shared/client/index.js";
var prisma = global.prisma || new PrismaClient(), db_server_default = prisma;

// app/shopify.server.js
var shopify2 = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(db_server_default),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks"
    }
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify2.registerWebhooks({ session });
    }
  },
  future: {
    v3_webhookAdminContext: !0,
    v3_authenticatePublic: !0
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
var addDocumentResponseHeaders = shopify2.addDocumentResponseHeaders, authenticate = shopify2.authenticate, unauthenticated = shopify2.unauthenticated, login = shopify2.login, registerWebhooks = shopify2.registerWebhooks, sessionStorage = shopify2.sessionStorage;

// app/entry.server.jsx
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  let callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [callbackName]: () => {
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function App() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(Outlet, {}),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(LiveReload, {}),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}

// app/routes/app.additional.jsx
var app_additional_exports = {};
__export(app_additional_exports, {
  default: () => AdditionalPage
});
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack
} from "@shopify/polaris";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AdditionalPage() {
  return /* @__PURE__ */ jsxs2(Page, { children: [
    /* @__PURE__ */ jsx3("ui-title-bar", { title: "Additional page" }),
    /* @__PURE__ */ jsxs2(Layout, { children: [
      /* @__PURE__ */ jsx3(Layout.Section, { children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxs2(Text, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ jsx3(
            Link,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              removeUnderline: !0,
              children: "App Bridge"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ jsxs2(Text, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ jsx3(Code, { children: "app/routes" }),
          ", and a link to it in the ",
          /* @__PURE__ */ jsx3(Code, { children: "<ui-nav-menu>" }),
          " component found in ",
          /* @__PURE__ */ jsx3(Code, { children: "app/routes/app.jsx" }),
          "."
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx3(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "200", children: [
        /* @__PURE__ */ jsx3(Text, { as: "h2", variant: "headingMd", children: "Resources" }),
        /* @__PURE__ */ jsx3(List, { children: /* @__PURE__ */ jsx3(List.Item, { children: /* @__PURE__ */ jsx3(
          Link,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            removeUnderline: !0,
            children: "App nav best practices"
          }
        ) }) })
      ] }) }) })
    ] })
  ] });
}
function Code({ children }) {
  return /* @__PURE__ */ jsx3(
    Box,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "100",
      paddingInlineEnd: "100",
      background: "bg-surface-active",
      borderWidth: "025",
      borderColor: "border",
      borderRadius: "100",
      children: /* @__PURE__ */ jsx3("code", { children })
    }
  );
}

// app/routes/app._index.jsx
var app_index_exports = {};
__export(app_index_exports, {
  action: () => action,
  default: () => Index,
  loader: () => loader
});
import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page as Page2,
  Layout as Layout2,
  Text as Text2,
  Card as Card2,
  Button,
  BlockStack as BlockStack2,
  Box as Box2,
  List as List2,
  Link as Link2,
  InlineStack
} from "@shopify/polaris";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var loader = async ({ request }) => (await authenticate.admin(request), null), action = async ({ request }) => {
  let { admin } = await authenticate.admin(request), color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)], responseJson = await (await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }]
        }
      }
    }
  )).json();
  return json({
    product: responseJson.data.productCreate.product
  });
};
function Index() {
  let nav = useNavigation(), actionData = useActionData(), submit = useSubmit(), isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST", productId = actionData?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );
  useEffect(() => {
    productId && shopify.toast.show("Product created");
  }, [productId]);
  let generateProduct = () => submit({}, { replace: !0, method: "POST" });
  return /* @__PURE__ */ jsxs3(Page2, { children: [
    /* @__PURE__ */ jsx4("ui-title-bar", { title: "Remix app template", children: /* @__PURE__ */ jsx4("button", { variant: "primary", onClick: generateProduct, children: "Generate a product" }) }),
    /* @__PURE__ */ jsx4(BlockStack2, { gap: "500", children: /* @__PURE__ */ jsxs3(Layout2, { children: [
      /* @__PURE__ */ jsx4(Layout2.Section, { children: /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { gap: "500", children: [
        /* @__PURE__ */ jsxs3(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text2, { as: "h2", variant: "headingMd", children: "Congrats on creating a new Shopify app \u{1F389}" }),
          /* @__PURE__ */ jsxs3(Text2, { variant: "bodyMd", as: "p", children: [
            "This embedded app template uses",
            " ",
            /* @__PURE__ */ jsx4(
              Link2,
              {
                url: "https://shopify.dev/docs/apps/tools/app-bridge",
                target: "_blank",
                removeUnderline: !0,
                children: "App Bridge"
              }
            ),
            " ",
            "interface examples like an",
            " ",
            /* @__PURE__ */ jsx4(Link2, { url: "/app/additional", removeUnderline: !0, children: "additional page in the app nav" }),
            ", as well as an",
            " ",
            /* @__PURE__ */ jsx4(
              Link2,
              {
                url: "https://shopify.dev/docs/api/admin-graphql",
                target: "_blank",
                removeUnderline: !0,
                children: "Admin GraphQL"
              }
            ),
            " ",
            "mutation demo, to provide a starting point for app development."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text2, { as: "h3", variant: "headingMd", children: "Get started with products" }),
          /* @__PURE__ */ jsxs3(Text2, { as: "p", variant: "bodyMd", children: [
            "Generate a product with GraphQL and get the JSON output for that product. Learn more about the",
            " ",
            /* @__PURE__ */ jsx4(
              Link2,
              {
                url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate",
                target: "_blank",
                removeUnderline: !0,
                children: "productCreate"
              }
            ),
            " ",
            "mutation in our API references."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(InlineStack, { gap: "300", children: [
          /* @__PURE__ */ jsx4(Button, { loading: isLoading, onClick: generateProduct, children: "Generate a product" }),
          actionData?.product && /* @__PURE__ */ jsx4(
            Button,
            {
              url: `shopify:admin/products/${productId}`,
              target: "_blank",
              variant: "plain",
              children: "View product"
            }
          )
        ] }),
        actionData?.product && /* @__PURE__ */ jsx4(
          Box2,
          {
            padding: "400",
            background: "bg-surface-active",
            borderWidth: "025",
            borderRadius: "200",
            borderColor: "border",
            overflowX: "scroll",
            children: /* @__PURE__ */ jsx4("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx4("code", { children: JSON.stringify(actionData.product, null, 2) }) })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout2.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxs3(BlockStack2, { gap: "500", children: [
        /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text2, { as: "h2", variant: "headingMd", children: "App template specs" }),
          /* @__PURE__ */ jsxs3(BlockStack2, { gap: "200", children: [
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text2, { as: "span", variant: "bodyMd", children: "Framework" }),
              /* @__PURE__ */ jsx4(
                Link2,
                {
                  url: "https://remix.run",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Remix"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text2, { as: "span", variant: "bodyMd", children: "Database" }),
              /* @__PURE__ */ jsx4(
                Link2,
                {
                  url: "https://www.prisma.io/",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Prisma"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text2, { as: "span", variant: "bodyMd", children: "Interface" }),
              /* @__PURE__ */ jsxs3("span", { children: [
                /* @__PURE__ */ jsx4(
                  Link2,
                  {
                    url: "https://polaris.shopify.com",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "Polaris"
                  }
                ),
                ", ",
                /* @__PURE__ */ jsx4(
                  Link2,
                  {
                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "App Bridge"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text2, { as: "span", variant: "bodyMd", children: "API" }),
              /* @__PURE__ */ jsx4(
                Link2,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphQL API"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx4(Card2, { children: /* @__PURE__ */ jsxs3(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text2, { as: "h2", variant: "headingMd", children: "Next steps" }),
          /* @__PURE__ */ jsxs3(List2, { children: [
            /* @__PURE__ */ jsxs3(List2.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ jsxs3(
                Link2,
                {
                  url: "https://shopify.dev/docs/apps/getting-started/build-app-example",
                  target: "_blank",
                  removeUnderline: !0,
                  children: [
                    " ",
                    "example app"
                  ]
                }
              ),
              " ",
              "to get started"
            ] }),
            /* @__PURE__ */ jsxs3(List2.Item, { children: [
              "Explore Shopify\u2019s API with",
              " ",
              /* @__PURE__ */ jsx4(
                Link2,
                {
                  url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphiQL"
                }
              )
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
}

// app/routes/auth.login/route.jsx
var route_exports = {};
__export(route_exports, {
  action: () => action2,
  default: () => Auth,
  links: () => links,
  loader: () => loader2
});
import { useState } from "react";
import { json as json2 } from "@remix-run/node";
import {
  AppProvider as PolarisAppProvider,
  Button as Button2,
  Card as Card3,
  FormLayout,
  Page as Page3,
  Text as Text3,
  TextField
} from "@shopify/polaris";
import { Form, useActionData as useActionData2, useLoaderData } from "@remix-run/react";

// node_modules/@shopify/polaris/build/esm/styles.css
var styles_default = "/_static/build/_assets/styles-7OCDJQ4E.css";

// app/routes/auth.login/error.server.jsx
import { LoginErrorType } from "@shopify/shopify-app-remix/server";
function loginErrorMessage(loginErrors) {
  return loginErrors?.shop === LoginErrorType.MissingShop ? { shop: "Please enter your shop domain to log in" } : loginErrors?.shop === LoginErrorType.InvalidShop ? { shop: "Please enter a valid shop domain to log in" } : {};
}

// app/routes/auth.login/route.jsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var links = () => [{ rel: "stylesheet", href: styles_default }], loader2 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return json2({
    errors,
    polarisTranslations: __require("@shopify/polaris/locales/en.json")
  });
}, action2 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return json2({
    errors
  });
};
function Auth() {
  let loaderData = useLoaderData(), actionData = useActionData2(), [shop, setShop] = useState(""), { errors } = actionData || loaderData;
  return /* @__PURE__ */ jsx5(PolarisAppProvider, { i18n: loaderData.polarisTranslations, children: /* @__PURE__ */ jsx5(Page3, { children: /* @__PURE__ */ jsx5(Card3, { children: /* @__PURE__ */ jsx5(Form, { method: "post", children: /* @__PURE__ */ jsxs4(FormLayout, { children: [
    /* @__PURE__ */ jsx5(Text3, { variant: "headingMd", as: "h2", children: "Log in" }),
    /* @__PURE__ */ jsx5(
      TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      }
    ),
    /* @__PURE__ */ jsx5(Button2, { submit: !0, children: "Log in" })
  ] }) }) }) }) });
}

// app/routes/webhooks.jsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  let { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
  );
  if (!admin)
    throw new Response();
  switch (topic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};

// app/routes/_index/route.jsx
var route_exports2 = {};
__export(route_exports2, {
  default: () => App2,
  links: () => links2,
  loader: () => loader3
});
import { json as json3, redirect } from "@remix-run/node";
import { Form as Form2, useLoaderData as useLoaderData2 } from "@remix-run/react";

// app/routes/_index/style.css
var style_default = "/_static/build/_assets/style-6S2Q7E3W.css";

// app/routes/_index/route.jsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var links2 = () => [{ rel: "stylesheet", href: style_default }], loader3 = async ({ request }) => {
  let url = new URL(request.url);
  if (url.searchParams.get("shop"))
    throw redirect(`/app?${url.searchParams.toString()}`);
  return json3({ showForm: Boolean(login) });
};
function App2() {
  let { showForm } = useLoaderData2();
  return /* @__PURE__ */ jsx6("div", { className: "index", children: /* @__PURE__ */ jsxs5("div", { className: "content", children: [
    /* @__PURE__ */ jsx6("h1", { children: "A short heading about [your app]" }),
    /* @__PURE__ */ jsx6("p", { children: "A tagline about [your app] that describes your value proposition." }),
    showForm && /* @__PURE__ */ jsxs5(Form2, { method: "post", action: "/auth/login", children: [
      /* @__PURE__ */ jsxs5("label", { children: [
        /* @__PURE__ */ jsx6("span", { children: "Shop domain" }),
        /* @__PURE__ */ jsx6("input", { type: "text", name: "shop" }),
        /* @__PURE__ */ jsx6("span", { children: "e.g: my-shop-domain.myshopify.com" })
      ] }),
      /* @__PURE__ */ jsx6("button", { type: "submit", children: "Log in" })
    ] }),
    /* @__PURE__ */ jsxs5("ul", { children: [
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] })
    ] })
  ] }) });
}

// app/routes/auth.$.jsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader4
});
var loader4 = async ({ request }) => (await authenticate.admin(request), null);

// app/routes/app.jsx
var app_exports = {};
__export(app_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App3,
  headers: () => headers,
  links: () => links3,
  loader: () => loader5
});
import { json as json4 } from "@remix-run/node";
import { Link as Link3, Outlet as Outlet2, useLoaderData as useLoaderData3, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var links3 = () => [{ rel: "stylesheet", href: styles_default }], loader5 = async ({ request }) => (await authenticate.admin(request), json4({ apiKey: process.env.SHOPIFY_API_KEY || "" }));
function App3() {
  let { apiKey } = useLoaderData3();
  return /* @__PURE__ */ jsxs6(AppProvider, { isEmbeddedApp: !0, apiKey, children: [
    /* @__PURE__ */ jsxs6("ui-nav-menu", { children: [
      /* @__PURE__ */ jsx7(Link3, { to: "/app", rel: "home", children: "Home" }),
      /* @__PURE__ */ jsx7(Link3, { to: "/app/additional", children: "Additional page" })
    ] }),
    /* @__PURE__ */ jsx7(Outlet2, {})
  ] });
}
function ErrorBoundary() {
  return boundary.error(useRouteError());
}
var headers = (headersArgs) => boundary.headers(headersArgs);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/_static/build/entry.client-LYDGFGUX.js", imports: ["/_static/build/_shared/chunk-QZZFHC7F.js", "/_static/build/_shared/chunk-EHFTAB62.js", "/_static/build/_shared/chunk-L26KC3NW.js", "/_static/build/_shared/chunk-Z6A3565X.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/_static/build/root-7K3Q42O2.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/_static/build/routes/_index-TD77NSK4.js", imports: ["/_static/build/_shared/chunk-TUA4DKE4.js", "/_static/build/_shared/chunk-SVBXXHRN.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/app": { id: "routes/app", parentId: "root", path: "app", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/app-S3BFGX3I.js", imports: ["/_static/build/_shared/chunk-3KYGFAVT.js", "/_static/build/_shared/chunk-ZDTAAWAR.js", "/_static/build/_shared/chunk-QVDYNU53.js", "/_static/build/_shared/chunk-SVBXXHRN.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/app._index": { id: "routes/app._index", parentId: "routes/app", path: void 0, index: !0, caseSensitive: void 0, module: "/_static/build/routes/app._index-QFJRNYLK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/app.additional": { id: "routes/app.additional", parentId: "routes/app", path: "additional", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/app.additional-QHAHDJVP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/auth.$-3U6CZAYD.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/auth.login": { id: "routes/auth.login", parentId: "root", path: "auth/login", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/auth.login-P4YR2GIH.js", imports: ["/_static/build/_shared/chunk-ZDTAAWAR.js", "/_static/build/_shared/chunk-QVDYNU53.js", "/_static/build/_shared/chunk-TUA4DKE4.js", "/_static/build/_shared/chunk-SVBXXHRN.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/webhooks-XEGCBVOF.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 } }, version: "b79355d1", hmr: void 0, url: "/_static/build/manifest-B79355D1.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1 }, publicPath = "/_static/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: app_additional_exports
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_index_exports
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  }
};

// server.ts
var handler = createRequestHandler({
  build: server_build_exports,
  mode: "production"
});
export {
  handler
};
