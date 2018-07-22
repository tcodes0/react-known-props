const { htmlPropToReactPropMap } = require("../props/react");
const { svgPropToReactPropMap } = require("../generated/svgPropToReactPropMap");
const {
  htmlElementsToLegacyPropsMap,
  htmlSvgLegacyProps
} = require("../props/html");

const removeNonReactProps = arr =>
  arr.reduce(
    (acc, prop) =>
      htmlPropToReactPropMap[prop] || svgPropToReactPropMap[prop]
        ? acc
        : [...acc, prop],
    []
  );

const exists = x => x != null;
const isTruthy = x => x !== false && exists(x);
const isObj = o => typeof o === "object";

module.exports.parseOptionsObject = (optionObj, props, element) => {
  let out = undefined;

  // catch invalid arguments
  if (exists(optionObj) && !isObj(optionObj)) {
    //eslint-disable-next-line no-console
    throw new Error(
      `[react-known-props] Expected an object with options but got: '${typeof optionObj}' ${optionObj.toString()}`
    );
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
