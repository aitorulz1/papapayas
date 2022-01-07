const next = require("next");
const express = require("express");

const WooCommerceAPI = require("woocommerce-api");
const wooConfig = require("./wooConfig");
const {
  responseSymbol,
} = require("next/dist/server/web/spec-compliant/fetch-event");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const WooCommerce = new WooCommerceAPI({
  url: wooConfig.url,
  consumerKey: wooConfig.consumerKey,
  consumerSecret: wooConfig.consumerSecret,
  wpAPI: true,
  version: "wc/v1",
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/getProducts", (req, response) => {
      WooCommerce.get("products", function (err, data, res) {
        response.json(JSON.parse(res));
      });
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Ready on ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
