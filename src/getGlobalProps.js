const { reactGlobalProps } = require("./lists/reactGlobalProps");
const { ariaProps } = require("./lists/base/aria");
const { svgGlobalProps } = require("./lists/base/svg");
const { parseOptionsObject } = require("./utils/parseOptionsObject");

const arrayToMap = arr =>
  arr.reduce((acc, p) => Object.assign(acc, { [p]: p }), {});

const globals = Object.keys(
  Object.assign(arrayToMap(reactGlobalProps), arrayToMap(svgGlobalProps))
);

module.exports.getGlobalProps = options =>
  parseOptionsObject(options, [...ariaProps, ...globals]);
