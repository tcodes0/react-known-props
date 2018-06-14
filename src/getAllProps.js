const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { mapSvgReactProps } = require("./utils/mapSvgToReact");
const { mapReactHtmlProps } = require("./utils/mapReactHtmlProps");
const { duplicateReducer } = require("./utils/duplicateReducer");
const { getGlobalProps } = require("./getGlobalProps");
const { getEventProps } = require("./getEventProps");

const svgHtml = Object.assign(mapSvgReactProps, mapReactHtmlProps);
console.table(
  [...getGlobalProps(), ...getEventProps(), ...Object.keys(svgHtml)].reduce(
    duplicateReducer,
    []
  )
);

module.exports.getAllProps = options =>
  parseOptionsObject(options, () => [
    ...getGlobalProps(),
    ...getEventProps(),
    ...Object.keys(svgHtml)
  ]);
