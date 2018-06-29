const { ariaProps } = require("./lists/base/aria");
const { parseOptionsObject } = require("./utils/parseOptionsObject");
const { reactGlobalProps } = require("./lists/reactGlobalProps");
const { svgGlobalProps } = require("./lists/base/svg");
const { htmlElements } = require("./lists/base/html");
const {
  reactHtmlElementsToPropsMap
} = require("./lists/reactHtmlElementsToPropsMap");
const {
  reactSvgElementsToPropsMap
} = require("./lists/reactSvgElementsToPropsMap");

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
      ...reactHtmlElementsToPropsMap[element],
      ...reactSvgElementsToPropsMap[element]
    ]
      .sort()
      .filter(duplicateRemover);
  }

  return isSvg(element)
    ? [...reactSvgElementsToPropsMap[element], ...svgGlobalProps]
    : [...reactHtmlElementsToPropsMap[element], ...reactGlobalProps];
};

module.exports.getElementProps = (element, options) => {
  if (!element || typeof element !== "string") {
    throw new Error(
      "[react-known-props] getElementProps(element, options): element argument must not be undefined or non-string."
    );
  }

  let props;

  try {
    props = elementProps(element);
  } catch (error) {
    throw new Error(
      `[react-known-props] getElementProps(element, options): Please ensure '${element}' is a valid HTML or SVG element.\n`
    );
  }

  return parseOptionsObject(options, [...props, ...ariaProps], element);
};
