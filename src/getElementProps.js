const { propsAria } = require("./lists/aria");
const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { getElementSpecificProps } = require("./utils/getElementSpecificProps");
const { parseOptionsObject } = require("./utils/parseOptionsObject");

module.exports.getElementProps = (element, options) => {
  return parseOptionsObject(options, () => [
    ...getElementSpecificProps(element),
    ...getReactGlobalProps(),
    ...propsAria
  ]);
};
