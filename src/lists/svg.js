const { mapSvgElementsToProps } = require("./svgprops");
const { convertMap } = require("../utils/convertMap");
const { makeMapToReact } = require("../utils/makeMapReact");

module.exports.propsGlobalSvg = [
  "about",
  "class",
  "content",
  "datatype",
  "id",
  "lang",
  "property",
  "rel",
  "resource",
  "rev",
  "tabindex",
  "typeof"
];

const mapPropsToElementsSvg = convertMap(mapSvgElementsToProps);

module.exports.mapPropsToElementsSvg = mapPropsToElementsSvg;

module.exports.mapSvgPropToReactProp = makeMapToReact(mapPropsToElementsSvg);
