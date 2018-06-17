const { reactGlobalProps } = require("./lists/reactGlobalProps");
const { propsAria } = require("./lists/aria");
const { propsGlobalSvg } = require("./lists/svg");
const { arrayToMap } = require("./utils/arrayToMap");

const svgHtmlGlobals = Object.assign(
  arrayToMap(reactGlobalProps),
  arrayToMap(propsGlobalSvg)
);

module.exports.getGlobalProps = () => [
  ...propsAria,
  ...Object.keys(svgHtmlGlobals)
];
