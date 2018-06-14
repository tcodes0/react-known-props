const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { mapSvgReactProps } = require("./utils/mapSvgToReact");
const { mapReactHtmlProps } = require("./utils/mapReactHtmlProps");
const { duplicateReducer } = require("./utils/duplicateReducer");
const { getGlobalProps } = require("./getGlobalProps");
const { getEventProps } = require("./getEventProps");

// removing 4 duplicated props here
const { style, title, rel, content, ...svgHtml } = Object.assign(
  mapSvgReactProps,
  mapReactHtmlProps
);

// console.table(
//   [...getGlobalProps(), ...getEventProps(), ...Object.keys(svgHtml)].reduce(
//     duplicateReducer,
//     []
//   )
// );

module.exports.getAllProps = options =>
  parseOptionsObject(options, () => [
    ...getGlobalProps(),
    ...getEventProps(),
    ...Object.keys(svgHtml)
  ]);
