const {
  mapHtmlPropToReactProp,
  mapSvgPropToReactProp
} = require("../lists/react");

module.exports.removeNonReactProps = arr =>
  arr
    .map(
      prop =>
        mapHtmlPropToReactProp[prop] ? mapHtmlPropToReactProp[prop] : prop
    )
    .map(
      prop => (mapSvgPropToReactProp[prop] ? mapSvgPropToReactProp[prop] : prop)
    );
