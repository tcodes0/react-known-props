const { propsAria } = require("./lists/aria");
const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { propsGlobalSvg, mapPropsToElementsSvg } = require("./lists/svg");
const { mapReactHtmlProps } = require("./utils/mapReactHtmlProps");
const { mapSvgReactProps } = require("./utils/mapSvgToReact");

const elementProps = (map, element) =>
  Object.keys(map).reduce(
    (acc, prop) =>
      map[prop].indexOf(element) >= 0
        ? Object.assign(acc, { [prop]: prop })
        : acc,
    {}
  );

const mapElementSpecificProps = element =>
  Object.assign(
    elementProps(mapReactHtmlProps, element),
    elementProps(mapSvgReactProps, element)
  );

module.exports.getElementProps = (element, options) =>
  parseOptionsObject(options, () => [
    ...Object.keys(mapElementSpecificProps(element)),
    ...getReactGlobalProps(),
    ...propsAria,
    ...propsGlobalSvg
  ]);
