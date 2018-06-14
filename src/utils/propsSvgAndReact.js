const {
  mapPropsToElementsSvg,
  mapSvgPropToReactProp
} = require("../lists/svg");

module.exports.propsSvgAndReact = Object.keys(mapPropsToElementsSvg).reduce(
  (acc, prop) => {
    return mapSvgPropToReactProp[prop]
      ? [...acc, mapSvgPropToReactProp[prop], prop]
      : [...acc, prop];
  },
  []
);
