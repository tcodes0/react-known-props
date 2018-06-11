const { propsEvents } = require("./lists/react");
const { propsAria } = require("./lists/aria");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const {
  getMapReactAndHtmlPropsToElements
} = require("./utils/getMapReactAndHtmlPropsToElements");

module.exports.getAllProps = options =>
  parseOptionsObject(options, () => [
    ...getReactGlobalProps(),
    ...propsEvents,
    ...propsAria,
    ...Object.keys(getMapReactAndHtmlPropsToElements)
  ]);
