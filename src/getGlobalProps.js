const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { propsAria } = require("./lists/aria");
const { propsGlobalSvg } = require("./lists/svg");
const { arrayToMap } = require("./utils/arrayToMap");

const svgHtmlGlobals = Object.assign(
  arrayToMap(getReactGlobalProps()),
  arrayToMap(propsGlobalSvg)
);

module.exports.getGlobalProps = () => [
  ...propsAria,
  ...Object.keys(svgHtmlGlobals)
];
