const { reactGlobalProps } = require("../lists/reactGlobalProps");
const { propsGlobalSvg } = require("../lists/svg");
const { elements } = require("../lists/html");
const { arrayToMap } = require("../utils/arrayToMap");
const { getElementPropsFromMap } = require("../utils/getElementPropsFromMap");
const { mapReactHtmlProps } = require("./mapReactHtmlProps");
const { mapSvgReactProps } = require("./mapSvgToReact");

// html and svg share these elements
const commonElements = [
  "a",
  "audio",
  "canvas",
  "font",
  "iframe",
  "image",
  "script",
  "style",
  "title",
  "video"
];

const ifSvg = (tag, svgFn, htmlFn) =>
  elements.indexOf(tag) === -1 ? svgFn() : htmlFn();

const mapElementSpecificProps = element => {
  if (commonElements.indexOf(element) > -1) {
    return Object.assign(
      getElementPropsFromMap(mapReactHtmlProps, element),
      getElementPropsFromMap(mapSvgReactProps, element)
    );
  }

  return ifSvg(
    element,
    () => getElementPropsFromMap(mapSvgReactProps, element),
    () => getElementPropsFromMap(mapReactHtmlProps, element)
  );
};

const mapElementGlobalProps = element => {
  if (commonElements.indexOf(element) > -1) {
    return arrayToMap([...propsGlobalSvg, ...reactGlobalProps]);
  }

  //return globalSvg or globalHTML props accordingly
  return ifSvg(
    element,
    () => arrayToMap(propsGlobalSvg),
    () => arrayToMap(reactGlobalProps)
  );
};

module.exports.elementProps = element =>
  Object.keys(
    Object.assign(
      mapElementGlobalProps(element),
      mapElementSpecificProps(element)
    )
  );
