const { propsEvents, mapHtmlToReact } = require("./reactProps");
const {
  propsGlobal,
  mapPropsToElements,
  propsLegacy,
  elements,
  elementsObsolete,
  elementsDeprecated,
  elementsNonStandard,
  elementsExperimental
} = require("./htmlProps");

const propsReact = Object.keys(propsGlobal).map(
  prop => (mapHtmlToReact[prop] ? mapHtmlToReact[prop] : prop)
);

const getAllProps = () => {
  let allProps = [...propsGlobal, ...propsEvents];
  let elementProps = Object.keys(mapPropsToElements).reduce((acc, prop) => {
    return mapPropsToElements[prop].length === 0 ? [...acc, prop] : acc;
  }, []);
  return elementProps;
};

console.log(getAllProps());

const getGlobalProps = () => true;
const getElementProps = () => true;
const getEventProps = () => true;

// module.exports = props;
