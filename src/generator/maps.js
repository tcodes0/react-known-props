const { htmlPropToReactPropMap } = require("../props/react");
const { svgPropToReactPropMap } = require("../generated/svgPropToReactPropMap");
const {
  htmlPropsToElementsMap,
  reactExtraPropsMap,
  svgPropsToElementsMap
} = require("./props");

const htmlPlusReactMap = Object.keys(htmlPropsToElementsMap).reduce(
  (acc, prop) => {
    return htmlPropToReactPropMap[prop]
      ? Object.assign(acc, {
          [htmlPropToReactPropMap[prop]]: htmlPropsToElementsMap[prop],
          [prop]: htmlPropsToElementsMap[prop]
        })
      : Object.assign(acc, {
          [prop]: htmlPropsToElementsMap[prop]
        });
  },
  {}
);

module.exports.reactHtmlPropsMap = Object.assign(
  htmlPlusReactMap,
  reactExtraPropsMap
);

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
