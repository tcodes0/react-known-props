const { htmlPropToReactPropMap } = require("../props/react");
const { svgPropToReactPropMap } = require("../generated/svgPropToReactPropMap");
const {
  htmlElementsToLegacyPropsMap,
  htmlSvgLegacyProps
} = require("../props/html");

const existy = x => x != null;
const truthy = x => x !== false && existy(x);
const isObj = o => typeof o === "object";
const defaultFalseyArgs = (fn, ...defaults) => (...args) => {
  const safeArgs = args.map((arg, i) => (existy(arg) ? arg : defaults[i]));
  return fn.apply(null, safeArgs);
};
const addLegacyProps = defaultFalseyArgs(
  (props, element) =>
    existy(htmlElementsToLegacyPropsMap[element])
      ? [...htmlElementsToLegacyPropsMap[element], ...props]
      : [...htmlSvgLegacyProps, ...props],
  [],
  "div"
);

// validate that I got an object
// validate that I got anything at all

module.exports.parseOptionsObject = (options, totalProps, element) => {
  const removeHtmlSvgProps = defaultFalseyArgs(
    arr =>
      arr.reduce(
        (acc, prop) =>
          existy(htmlPropToReactPropMap[prop]) ||
          existy(svgPropToReactPropMap[prop])
            ? acc
            : [...acc, prop],
        []
      ),
    totalProps
  );

  let out = undefined;

  //abstract this
  // catch invalid arguments
  if (existy(options) && !isObj(options)) {
    throw new Error(
      `[react-known-props] Expected an object with options but got: '${typeof options}' ${options.toString()}`
    );
  }

  // default, no options action
  if (
    options === undefined ||
    Object.keys(options).length === 0 ||
    (options.legacy === false && options.onlyReact === false)
  ) {
    return totalProps;
  }

  if (options.legacy === true) out = addLegacyProps(totalProps, element);
  if (options.legacy === false) out = totalProps;
  if (options.onlyReact === true) out = removeHtmlSvgProps(out);
  if (options.onlyReact === false) out = out ? out : totalProps;

  return out;
};
