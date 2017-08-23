const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logfmt = require("logfmt");

const health = require("./routes/health");
const route = require("./routes/route");
const table = require("./routes/table");

const osrmBindings = require("./lib/osrm");

function configureMiddlewares(app) {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(logfmt.requestLogger());
}

function configureRoutes(app) {
  app.use("/health", health);
  app.use("/route", route);
  app.use("/table", table);
}

function configureOSRM(app, options) {
  const osrm = osrmBindings.loadGraph(options);
  app.set("osrm", osrm);
}

function createServer(options) {
  const opts = options || {};
  const app = express();
  configureOSRM(app, opts);
  configureMiddlewares(app);
  configureRoutes(app);
  return http.createServer(app);
}

module.exports = {
  createServer
};
