const {
  getMapReactAndHtmlPropsToElements
} = require("./getMapReactAndHtmlPropsToElements");

const map = getMapReactAndHtmlPropsToElements;

module.exports.getElementSpecificProps = element =>
  Object.keys(map).reduce((acc, prop) => {
    return map[prop].indexOf(element) >= 0 ? [...acc, prop] : acc;
  }, []);
