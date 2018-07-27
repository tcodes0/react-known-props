const { existy, truthy, isObj } = require("./baseFunctions");
const { htmlPropToReactPropMap } = require("../props/react");
const { svgPropToReactPropMap } = require("../generated/svgPropToReactPropMap");
const {
  htmlElementsToLegacyPropsMap,
  htmlSvgLegacyProps
} = require("../props/html");

const removeNonReactProps = arr =>
  arr.reduce(
    (acc, prop) =>
      existy(htmlPropToReactPropMap[prop]) ||
      existy(svgPropToReactPropMap[prop])
        ? acc
        : [...acc, prop],
    []
  );

const addLegacyProps = (props, element) =>
  existy(htmlElementsToLegacyPropsMap[element])
    ? [...htmlElementsToLegacyPropsMap[element], ...props]
    : [...htmlSvgLegacyProps, ...props];

const option = (obj, option) => {
  if (existy(obj) && !isObj(obj))
    throw new Error(
      `[react-known-props] Expected an object with options but got: '${typeof obj}' ${obj.toString()}`
    );

  return obj && obj[option];
};

module.exports.filter = (options, inputProps, element) => {
  const result = {
    props: inputProps,
    filterBy: function(condition, fn, name) {
      if (truthy(condition)) this.props = fn(this.props, name);
      return this;
    }
  };

  // prettier-ignore
  return result
    .filterBy(option(options, "legacy"), addLegacyProps, element)
    .filterBy(option(options, "onlyReact"), removeNonReactProps)
    .props;
};
