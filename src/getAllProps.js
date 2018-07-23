const { filter } = require("./utils/filter");
const { allSvgHtmlReactProps } = require("./generated/allSvgHtmlReactProps");
const { getGlobalProps } = require("./getGlobalProps");
const { getEventProps } = require("./getEventProps");

module.exports.getAllProps = options =>
  filter(options, [
    ...getGlobalProps(),
    ...getEventProps(),
    ...allSvgHtmlReactProps
  ]);
