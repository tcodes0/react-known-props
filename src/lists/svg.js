const { mapSvgElementsToProps } = require("./svgprops");
const { convertMap } = require("../utils/convertMap");
const { makeMapToReact } = require("../utils/makeMapReact");

module.exports.propsGlobalSvg = [
  "about",
  // "class",
  "content",
  "datatype",
  // "id",
  // "lang",
  "property",
  "rel",
  "resource",
  "rev",
  // "tabindex",
  "typeof"
];

const mapPropsToElementsSvg = convertMap(mapSvgElementsToProps);

module.exports.mapPropsToElementsSvg = mapPropsToElementsSvg;

module.exports.mapSvgPropToReactProp = makeMapToReact(mapPropsToElementsSvg);

const dupElements = [
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

const dupProps = [
  "style",
  "title",
  "download",
  "href",
  "hrefLang",
  "hreflang",
  "target",
  "type",
  "max",
  "min",
  "height",
  "width",
  "name",
  "crossOrigin",
  "crossorigin",
  "media",
  "playbackorder",
  "timelinebegin",
  "method",
  "content",
  "rel"
];
