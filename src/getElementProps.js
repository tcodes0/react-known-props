const { ariaProps } = require("./props/aria");
const { filter } = require("./utils/filter");
const { existy } = require("./utils/baseFunctions");
const { reactGlobalProps } = require("./generated/reactGlobalProps");
const { svgGlobalProps } = require("./props/svg");
const { htmlElements } = require("./props/html");
const { getGlobalProps } = require("./getGlobalProps");
const {
  reactHtmlElementsToPropsMap
} = require("./generated/reactHtmlElementsToPropsMap");
const {
  reactSvgElementsToPropsMap
} = require("./generated/reactSvgElementsToPropsMap");

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
  if (!existy(element) || typeof element !== "string") {
    //eslint-disable-next-line no-console
    console.warn(
      `[react-known-props] getElementProps: Expected element argument type 'string' but got '${typeof element}'.`
    );

    return getGlobalProps();
  }

  let props;

  try {
    props = elementProps(element);
  } catch (error) {
    //eslint-disable-next-line no-console
    console.warn(
      `[react-known-props] getElementProps: Unrecognized HTML or SVG element: '${element}'.\n`
    );

    return getGlobalProps();
  }

  return filter(options, [...props, ...ariaProps], element);
};
