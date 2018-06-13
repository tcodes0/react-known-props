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

const mapSvgPropsToElements = convertMap(mapSvgElementsToProps);

module.exports.mapSvgPropsToElements = mapSvgPropsToElements;

module.exports.mapSvgToReactProps = makeMapToReact(mapSvgPropsToElements);
