const {
  propsEvents,
  propsGlobalReact,
  mapPropsToElementsReact
} = require("./reactProps");
const {
  propsLegacy,
  elements,
  elementsObsolete,
  elementsDeprecated,
  elementsNonStandard,
  elementsExperimental
} = require("./htmlProps");

const getElementSpecificProps = element =>
  Object.keys(mapPropsToElementsReact).reduce((acc, prop) => {
    return mapPropsToElementsReact[prop].includes(element)
      ? [...acc, prop]
      : acc;
  }, []);

const removeLegacy = arr => arr.filter(prop => !propsLegacy.includes(prop));

const parseOptionsObject = (obj, defaultFn) => {
  if (
    obj === undefined ||
    (typeof obj === "object" && Object.keys(obj).length === 0) ||
    obj.legacy === false
  ) {
    return removeLegacy(defaultFn());
  }

  if (obj.legacy === true) return defaultFn();

  console.error(`[react-known-props] Invalid options object: ${obj}`);
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
