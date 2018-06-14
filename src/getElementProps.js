const { propsAria } = require("./lists/aria");
const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { getElementSpecificProps } = require("./utils/getElementSpecificProps");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { propsGlobalSvg } = require("./lists/svg");

module.exports.getElementProps = (element, options) =>
  parseOptionsObject(options, () => [
    ...getElementSpecificProps(element),
    ...getReactGlobalProps(),
    ...propsAria,
    ...propsGlobalSvg
  ]);
