const {
  propsEvents,
  propsGlobalReact,
  mapPropsToElementsReact
} = require("./reactProps");
const { propsLegacyGlobal, mapHtmlPropToReactProp } = require("./htmlProps");

const getElementSpecificProps = element =>
  Object.keys(mapPropsToElementsReact).reduce((acc, prop) => {
    return mapPropsToElementsReact[prop].includes(element)
      ? [...acc, prop]
      : acc;
  }, []);

const removeLegacy = arr =>
  arr.filter(prop => !propsLegacyGlobal.includes(prop));

const removeNonReactProps = arr =>
  arr.map(
    prop => (mapHtmlPropToReactProp[prop] ? mapHtmlPropToReactProp[prop] : prop)
  );

const parseOptionsObject = (obj, defaultFn) => {
  if (
    obj === undefined ||
    (typeof obj === "object" && Object.keys(obj).length === 0) ||
    obj.legacy === false ||
    obj.onlyReact === false
  ) {
    return removeLegacy(defaultFn());
  }

  if (obj.legacy === true) return defaultFn();

  if (obj.onlyReact === true) return removeNonReactProps(defaultFn());

  console.error(
    `[react-known-props] Invalid options object: ${
      Object.keys(obj).length ? Object.keys(obj) : obj
    }`
  );
};

const getElementProps = (element, options) => {
  return parseOptionsObject(options, () => [
    ...getElementSpecificProps(element),
    ...propsGlobalReact
  ]);
};

const getAllProps = options => {
  return parseOptionsObject(options, () => [
    ...propsGlobalReact,
    ...propsEvents,
    ...Object.keys(mapPropsToElementsReact)
  ]);
};

const getGlobalProps = () => propsGlobalReact;
const getEventProps = () => propsEvents;

module.exports.getAllProps = getAllProps;
module.exports.getElementProps = getElementProps;
module.exports.getEventProps = getEventProps;
module.exports.getGlobalProps = getGlobalProps;

let lo = getElementProps("input").includes("defaultChecked");
// console.log(lo);
// getElementProps("input", { legacy: true }).includes("checked") &&
//   getElementProps("input").includes("defaultChecked"),
