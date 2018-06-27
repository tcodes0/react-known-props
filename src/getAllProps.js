const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { allSvgHtmlReactProps } = require("./lists/allSvgHtmlReactProps");
const { getGlobalProps } = require("./getGlobalProps");
const { getEventProps } = require("./getEventProps");

module.exports.getAllProps = options =>
  parseOptionsObject(options, () => [
    ...getGlobalProps(),
    ...getEventProps(),
    ...allSvgHtmlReactProps
  ]);
