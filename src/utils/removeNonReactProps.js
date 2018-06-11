const { mapHtmlPropToReactProp } = require("../lists/react");

module.exports.removeNonReactProps = arr =>
  arr.map(
    prop => (mapHtmlPropToReactProp[prop] ? mapHtmlPropToReactProp[prop] : prop)
  );
