/* eslint-disable strict */

"use strict";

process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "error";

const test = require("tape");
const request = require("supertest");

const app = require("../src/app");

const osrmTestData = process.env.OSRM_TEST_GRAPH;

const before = test;
const after = test;

let server;

// will be run before the other tests
before("before", (assert) => {
  server = app.createServer({ osrmDataPath: osrmTestData }).listen(5555);
  assert.end();
});

test("GET /health", (assert) => {
  request(server)
    .get("/health")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end((err, res) => {
      const expected = { health: "ok" };
      assert.error(err, "No error");
      assert.deepEqual(res.body, expected, "The health should be ok");
      assert.end();
    });
});

test("POST /route", (assert) => {
  request(server)
    .post("/route")
    .set("content-type", "application/json")
    .send({ coordinates: [[13.3905, 52.5205], [13.3906, 52.5206]] })
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end((err, res) => {
      assert.error(err, "No error");
      assert.ok(res.body.routes, "Routes could be found");
      assert.end();
    });
});

test("POST /table", (assert) => {
  request(server)
    .post("/table")
    .set("content-type", "application/json")
    .send({ coordinates: [[13.3905, 52.5205], [13.3906, 52.5206]] })
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end((err, res) => {
      const expected = [[0, 1.2], [1.2, 0]];
      assert.deepEqual(res.body.durations, expected, "The calculated durations are the same");
      assert.end();
    });
});

// will be run as last step
after("after", (assert) => {
  server.close();
  assert.end();
});
