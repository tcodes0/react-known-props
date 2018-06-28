const { reactGlobalProps } = require("../lists/reactGlobalProps");
const { propsGlobalSvg } = require("../lists/svg");
const { elements } = require("../lists/html");
const {
  reactHtmlElementToPropsMap
} = require("../lists/reactHtmlElementToPropsMap");
const {
  reactSvgElementToPropsMap
} = require("../lists/reactSvgElementToPropsMap");

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

const isSvg = tag => elements.indexOf(tag) === -1;

const dedupeFilter = (prop, index, array) => prop !== array[index + 1];

module.exports.elementProps = element => {
  if (commonElements.indexOf(element) > -1) {
    return [
      ...propsGlobalSvg,
      ...reactGlobalProps,
      ...reactHtmlElementToPropsMap[element],
      ...reactSvgElementToPropsMap[element]
    ]
      .sort()
      .filter(dedupeFilter);
  }

  return isSvg(element)
    ? [...reactSvgElementToPropsMap[element], ...propsGlobalSvg]
    : [...reactHtmlElementToPropsMap[element], ...reactGlobalProps];
};
