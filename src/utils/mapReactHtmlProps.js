const { mapPropsToElements } = require("../lists/html");
const {
  mapHtmlPropToReactProp,
  mapPropsToElementsReactExtras
} = require("../lists/react");

// reduce costs 11k
const mapHtmlPlusReact = Object.keys(mapPropsToElements).reduce((acc, prop) => {
  return mapHtmlPropToReactProp[prop]
    ? Object.assign(acc, {
        [mapHtmlPropToReactProp[prop]]: mapPropsToElements[prop],
        [prop]: mapPropsToElements[prop]
      })
    : Object.assign(acc, {
        [prop]: mapPropsToElements[prop]
      });
}, {});

module.exports.mapReactHtmlProps = Object.assign(
  mapHtmlPlusReact,
  mapPropsToElementsReactExtras
);
