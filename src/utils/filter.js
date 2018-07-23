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

const checkOption = (obj, option) => {
  if (existy(obj) && !isObj(obj))
    throw new Error(
      `[react-known-props] Expected an object with options but got: '${typeof obj}' ${obj.toString()}`
    );

  return obj && obj[option];
};

module.exports.filter = (options, propsToFilter, element) => {
  const selected = {
    props: propsToFilter,
    filterBy: function(condition, fn, name) {
      if (truthy(condition)) this.props = fn(this.props, name);
      return this;
    }
  };

  return selected
    .filterBy(checkOption(options, "legacy"), addLegacyProps, element)
    .filterBy(checkOption(options, "onlyReact"), removeNonReactProps).props;
};
