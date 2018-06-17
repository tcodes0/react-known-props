const { propsAria } = require("./lists/aria");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { elementProps } = require("./utils/elementProps");

module.exports.getElementProps = (element, options) =>
  parseOptionsObject(
    options,
    () => [...elementProps(element), ...propsAria],
    element
  );
