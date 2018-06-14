const { mapPropsToElementsSvg } = require("../lists/svg");
const { mapSvgPropToReactProp } = require("../lists/react");

module.exports.propsSvgAndReact = Object.keys(mapPropsToElementsSvg).reduce(
  (acc, prop) => {
    return mapSvgPropToReactProp[prop]
      ? [...acc, mapSvgPropToReactProp[prop], prop]
      : [...acc, prop];
  },
  []
);
