const { getAllProps } = require("../dist/index");
const { getElementProps } = require("../dist/index");
const { getEventProps } = require("../dist/index");
const { getGlobalProps } = require("../dist/index");
const Benchmark = require("benchmark");

const getall = new Benchmark.Suite("getAllProps()");
getall
  .add("getAllProps", function() {
    void getAllProps();
  })
  .on("cycle", function(event) {
    console.log(String(event.target)); //eslint-disable-line no-console
  })
  .on("start", function() {
    console.log(`Benchmarking ${this.name}`); //eslint-disable-line no-console
  });

const getglobal = new Benchmark.Suite("getGlobalProps()");
getglobal
  .add("getGlobalProps()", function() {
    void getGlobalProps();
  })
  .on("cycle", function(event) {
    console.log(String(event.target)); //eslint-disable-line no-console
  })
  .on("start", function() {
    console.log(`Benchmarking ${this.name}`); //eslint-disable-line no-console
  });

const getelement = new Benchmark.Suite("getElementProps('label')");
getelement
  .add("getElementProps('label')", function() {
    void getElementProps("label");
  })
  .on("cycle", function(event) {
    console.log(String(event.target)); //eslint-disable-line no-console
  })
  .on("start", function() {
    console.log(`Benchmarking ${this.name}`); //eslint-disable-line no-console
  });

const getevent = new Benchmark.Suite("getEventProps()");
getevent
  .add("getEventProps()", function() {
    void getEventProps();
  })
  .on("cycle", function(event) {
    console.log(String(event.target)); //eslint-disable-line no-console
  })
  .on("start", function() {
    console.log(`Benchmarking ${this.name}`); //eslint-disable-line no-console
  });

const suites = [];
suites.push(getall);
// suites.push(getelement);
// suites.push(getevent);
// suites.push(getglobal);
suites.forEach(su => su.run({ async: true }));
