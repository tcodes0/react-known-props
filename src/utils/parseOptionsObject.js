const { htmlPropToReactPropMap } = require("../lists/base/react");
const { svgPropToReactPropMap } = require("../lists/svgPropToReactPropMap");
const {
  htmlElementsToLegacyPropsMap,
  htmlSvgLegacyProps
} = require("../lists/base/html");

const removeNonReactProps = arr =>
  arr.reduce(
    (acc, prop) =>
      htmlPropToReactPropMap[prop] || svgPropToReactPropMap[prop]
        ? acc
        : [...acc, prop],
    []
  );

module.exports.parseOptionsObject = (optionObj, props, element) => {
  let out = undefined;

  // catch invalid arguments
  if (optionObj !== undefined && typeof optionObj !== "object") {
    //eslint-disable-next-line no-console
    console.error(
      `[react-known-props] Invalid options object: ${optionObj.toString()}`
    );
    return out;
  }

  // default, no options action
  if (
    optionObj === undefined ||
    Object.keys(optionObj).length === 0 ||
    (optionObj.legacy === false && optionObj.onlyReact === false)
  ) {
    return props;
  }

  if (optionObj.legacy === true) {
    if (Object.keys(htmlElementsToLegacyPropsMap).indexOf(element) !== -1) {
      out = [...htmlElementsToLegacyPropsMap[element], ...props];
    } else {
      out = [...htmlSvgLegacyProps, ...props];
    }
  }

  if (optionObj.legacy === false) out = props;

  if (optionObj.onlyReact === true)
    out = out ? removeNonReactProps(out) : removeNonReactProps(props);
  if (optionObj.onlyReact === false) out = out ? out : props;

  return out;
};
