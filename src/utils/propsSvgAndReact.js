const { mapPropsToElementsSvg } = require("../lists/svg");
const { mapSvgPropToReactProp } = require("../utils/mapSvgToReact");

module.exports.propsSvgAndReact = Object.keys(mapPropsToElementsSvg).reduce(
  (acc, prop) =>
    mapSvgPropToReactProp[prop]
      ? [...acc, mapSvgPropToReactProp[prop], prop]
      : [...acc, prop],
  []
);
