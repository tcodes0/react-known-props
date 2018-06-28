const { ariaProps } = require("./lists/aria");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { reactGlobalProps } = require("./lists/reactGlobalProps");
const { svgGlobalProps } = require("./lists/svg");
const { htmlElements } = require("./lists/html");
const {
  reactHtmlElementToPropsMap
} = require("./lists/reactHtmlElementToPropsMap");
const {
  reactSvgElementToPropsMap
} = require("./lists/reactSvgElementToPropsMap");

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

const isSvg = tag => htmlElements.indexOf(tag) === -1;

const duplicateRemover = (prop, index, array) => prop !== array[index + 1];

const elementProps = element => {
  if (commonElements.indexOf(element) > -1) {
    return [
      ...svgGlobalProps,
      ...reactGlobalProps,
      ...reactHtmlElementToPropsMap[element],
      ...reactSvgElementToPropsMap[element]
    ]
      .sort()
      .filter(duplicateRemover);
  }

  return isSvg(element)
    ? [...reactSvgElementToPropsMap[element], ...svgGlobalProps]
    : [...reactHtmlElementToPropsMap[element], ...reactGlobalProps];
};

module.exports.getElementProps = (element, options) =>
  parseOptionsObject(
    options,
    () => [...elementProps(element), ...ariaProps],
    element
  );
