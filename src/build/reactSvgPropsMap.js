const { svgPropsToElementsMap } = require("./svgProps");
const { svgPropToReactPropMap } = require("../lists/svgPropToReactPropMap");

module.exports.reactSvgPropsMap = Object.keys(svgPropsToElementsMap).reduce(
  (acc, prop) =>
    svgPropToReactPropMap[prop]
      ? Object.assign(
          acc,
          { [svgPropToReactPropMap[prop]]: svgPropsToElementsMap[prop] },
          { [prop]: svgPropsToElementsMap[prop] }
        )
      : Object.assign(acc, { [prop]: svgPropsToElementsMap[prop] }),
  {}
);
