const { propsGlobal } = require("../lists/html");
const { mapHtmlPropToReactProp, propsGlobalReact } = require("../lists/react");

module.exports.getReactGlobalProps = () =>
  propsGlobal
    .reduce((acc, prop) => {
      return mapHtmlPropToReactProp[prop]
        ? [...acc, mapHtmlPropToReactProp[prop], prop]
        : [...acc, prop];
    }, [])
    .concat(propsGlobalReact);
