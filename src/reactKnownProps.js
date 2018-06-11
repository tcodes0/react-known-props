const {
  propsEvents,
  propsGlobalReact,
  mapPropsToElementsReact,
  mapHtmlPropToReactProp
} = require("./reactProps");
const { propsLegacyGlobal } = require("./htmlProps");
const { propsAria } = require("./ariaProps");

const getElementSpecificProps = element =>
  Object.keys(mapPropsToElementsReact).reduce((acc, prop) => {
    return mapPropsToElementsReact[prop].indexOf(element) >= 0
      ? [...acc, prop]
      : acc;
  }, []);

const removeLegacy = arr =>
  arr.filter(prop => propsLegacyGlobal.indexOf(prop) === -1);

const removeNonReactProps = arr =>
  arr.map(
    prop => (mapHtmlPropToReactProp[prop] ? mapHtmlPropToReactProp[prop] : prop)
  );

const parseOptionsObject = (obj, defaultFn) => {
  let out = undefined;

  if (obj !== undefined && typeof obj !== "object") {
    console.error(
      `[react-known-props] Invalid options object: ${obj.toString()}`
    );
    return out;
  }

  if (
    obj === undefined ||
    Object.keys(obj).length === 0 ||
    (obj.legacy === false && obj.onlyReact === false)
  ) {
    return removeLegacy(defaultFn());
  }

  if (obj.legacy === true) out = defaultFn();
  if (obj.legacy === false) out = removeLegacy(defaultFn());

  if (obj.onlyReact === true)
    out = out ? removeNonReactProps(out) : removeNonReactProps(defaultFn());
  if (obj.onlyReact === false) out = out ? out : defaultFn();

  return out;
};

const getElementProps = (element, options) => {
  return parseOptionsObject(options, () => [
    ...getElementSpecificProps(element),
    ...propsGlobalReact,
    ...propsAria
  ]);
};

const getAllProps = options => {
  return parseOptionsObject(options, () => [
    ...propsGlobalReact,
    ...propsEvents,
    ...propsAria,
    ...Object.keys(mapPropsToElementsReact)
  ]);
};

module.exports.getAllProps = getAllProps;
module.exports.getElementProps = getElementProps;
module.exports.getEventProps = () => propsEvents;
module.exports.getGlobalProps = () => [...propsGlobalReact, ...propsAria];
