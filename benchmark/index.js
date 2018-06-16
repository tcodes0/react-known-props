const { getAllProps } = require("../dist/index");
const { getElementProps } = require("../dist/index");
const { getEventProps } = require("../dist/index");
const { getGlobalProps } = require("../dist/index");
const Benchmark = require("benchmark");
const suite = new Benchmark.Suite("All methods");

suite
  .add("getAllProps", function() {
    void getAllProps();
  })
  .add("getElementProps('label')", function() {
    void getElementProps("label");
  })
  .add("getEventProps()", function() {
    void getEventProps();
  })
  .add("getGlobalProps()", function() {
    void getGlobalProps();
  })
  .on("cycle", function(event) {
    console.log(String(event.target)); //eslint-disable-line no-console
  })
  .on("start", function() {
    console.group(`Benchmarking ${this.name}`); //eslint-disable-line no-console
  })
  .run({ async: true });
