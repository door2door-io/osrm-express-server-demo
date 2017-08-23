const logfmt = require("logfmt");
const app = require("./app");

const server = app.createServer({ osrmDataPath: process.env.OSRM_GRAPH });

server.listen(5000, () => {
  logfmt.log({ "start": "running server",
               "address": server.address().address,
               "port": server.address().port,
               "osrm-dataset": process.env.OSRM_GRAPH
             });
});
