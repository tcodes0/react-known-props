const { mapHtmlPropToReactProp } = require("../lists/react");
const { mapSvgPropToReactProp } = require("../lists/svg");

module.exports.removeNonReactProps = arr =>
  arr
    .map(
      prop =>
        mapHtmlPropToReactProp[prop] ? mapHtmlPropToReactProp[prop] : prop
    )
    .map(
      prop => (mapSvgPropToReactProp[prop] ? mapSvgPropToReactProp[prop] : prop)
    );
