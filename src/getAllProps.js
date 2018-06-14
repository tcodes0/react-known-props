const { propsEvents } = require("./lists/react");
const { propsAria } = require("./lists/aria");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { propsGlobalSvg } = require("./lists/svg");
const { mapSvgReactProps } = require("./utils/mapSvgToReact");
const { mapReactHtmlProps } = require("./utils/mapReactHtmlProps");
const { getGlobalProps } = require("./getGlobalProps");

const noDups = Object.assign(mapSvgReactProps, mapReactHtmlProps);

module.exports.getAllProps = options =>
  parseOptionsObject(options, () => [
    ...getGlobalProps(),
    ...propsEvents,
    ...Object.keys(noDups)
  ]);
