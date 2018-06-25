const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { mapSvgReactProps } = require("./utils/mapSvgToReact");
const { mapReactHtmlProps } = require("./utils/mapReactHtmlProps");
const { getGlobalProps } = require("./getGlobalProps");
const { getEventProps } = require("./getEventProps");

// removing 4 duplicated props here
// eslint-disable-next-line
const { style, title, rel, content, ...svgHtml } = Object.assign(
  mapSvgReactProps,
  mapReactHtmlProps
);

module.exports.getAllProps = options =>
  parseOptionsObject(options, () => [
    ...getGlobalProps(),
    ...getEventProps(),
    ...Object.keys(svgHtml) //save static arrays with props only for getall
  ]);
