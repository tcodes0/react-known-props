const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { propsAria } = require("./lists/aria");
const { propsGlobalSvg } = require("./lists/svg");

module.exports.getGlobalProps = () => [
  ...getReactGlobalProps(),
  ...propsAria,
  ...propsGlobalSvg
];
