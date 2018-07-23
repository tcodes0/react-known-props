const { htmlPropToReactPropMap } = require("../props/react");
const { svgPropToReactPropMap } = require("../generated/svgPropToReactPropMap");
const {
  htmlElementsToLegacyPropsMap,
  htmlSvgLegacyProps
} = require("../props/html");

const existy = x => x != null;
const truthy = x => x !== false && existy(x);
const isObj = o => typeof o === "object";
const identity = x => x;
const defaultFalseyArgs = (fn, ...defaults) => (...args) => {
  const safeArgs = args.map((arg, i) => (existy(arg) ? arg : defaults[i]));
  return fn.apply(null, safeArgs);
};

module.exports.parseOptionsObject = (options, totalProps, givenElement) => {
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

  const addLegacyProps = defaultFalseyArgs(
    (props, element) =>
      existy(htmlElementsToLegacyPropsMap[element])
        ? [...htmlElementsToLegacyPropsMap[element], ...props]
        : [...htmlSvgLegacyProps, ...props],
    totalProps,
    "div"
  );

  const passProps = defaultFalseyArgs(identity, totalProps);

  const filterBy = (conditionFn, fn, name, props) =>
    truthy(conditionFn()) ? fn(props, name) : passProps(props);

  const checkOption = (obj, option) => {
    // catch invalid arguments
    if (existy(obj) && !isObj(obj)) {
      throw new Error(
        `[react-known-props] Expected an object with options but got: '${typeof obj}' ${obj.toString()}`
      );
    }

    return obj && obj[option];
  };

  let selected = undefined;
  // let selected = { props: undefined, filterBy: filterBy };

  // default, no options action
  selected = filterBy(
    () =>
      checkOption(options, "legacy") === false &&
      checkOption(options, "onlyReact") === false,
    identity,
    null,
    selected
  );

  selected = filterBy(
    () => options === undefined || Object.keys(options).length === 0,
    identity,
    null,
    selected
  );
  selected = filterBy(
    () => checkOption(options, "legacy"),
    addLegacyProps,
    givenElement,
    selected
  );
  selected = filterBy(
    () => checkOption(options, "onlyReact"),
    removeHtmlSvgProps,
    null,
    selected
  );

  return selected;
};
