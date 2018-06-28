const { svgPropsToElementsMap } = require("../lists/svg");
const { svgPropToReactPropMap } = require("../lists/svgPropToReactPropMap");

module.exports.svgReactPropsMap = Object.keys(svgPropsToElementsMap).reduce(
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
