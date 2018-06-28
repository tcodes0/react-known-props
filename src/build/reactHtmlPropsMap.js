const { htmlPropsToElementsMap } = require("../lists/base/html");
const {
  htmlPropToReactPropMap,
  reactExtraPropsMap
} = require("../lists/base/react");

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
