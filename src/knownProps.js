const {
  propsEvents,
  propsGlobalReact,
  mapReactPropsToElements
} = require("./reactProps");
const {
  propsLegacy,
  elements,
  elementsObsolete,
  elementsDeprecated,
  elementsNonStandard,
  elementsExperimental
} = require("./htmlProps");

const getGlobalProps = () => propsGlobalReact;
const getEventProps = () => propsEvents;

const getElementSpecificProps = element =>
  Object.keys(mapReactPropsToElements).reduce((acc, prop) => {
    return mapReactPropsToElements[prop].includes(element)
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
};

const getElementProps = (element, opts) => {
  return parseOptionsObject(opts, () => [
    ...getElementSpecificProps(element),
    ...propsGlobalReact
  ]);

  console.error(`invalid options object passed to getAllProps: ${opts}`);
};

const getAllProps = opts => {
  return parseOptionsObject(opts, () => [
    ...propsGlobalReact,
    ...propsEvents,
    ...Object.keys(mapReactPropsToElements)
  ]);
};

module.exports.getAllProps = getAllProps;
module.exports.getElementProps = getElementProps;
module.exports.getEventProps = getEventProps;
module.exports.getGlobalProps = getGlobalProps;
