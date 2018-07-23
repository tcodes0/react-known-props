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

  const checkOption = (obj, option) => {
    if (existy(obj) && !isObj(obj))
      throw new Error(
        `[react-known-props] Expected an object with options but got: '${typeof obj}' ${obj.toString()}`
      );

    return obj && obj[option];
  };

  const selected = {
    props: undefined,
    filterBy: function(condition, fn, name) {
      this.props = truthy(condition)
        ? fn(this.props, name)
        : passProps(this.props);
      return this;
    }
  };

  selected
    .filterBy(checkOption(options, "legacy"), addLegacyProps, givenElement)
    .filterBy(checkOption(options, "onlyReact"), removeHtmlSvgProps);

  return selected.props;
};
