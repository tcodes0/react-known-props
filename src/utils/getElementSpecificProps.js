const {
  getMapReactAndHtmlPropsToElements
} = require("./getMapReactAndHtmlPropsToElements");
const { mapPropsToElementsSvg } = require("../lists/svg");

const map = getMapReactAndHtmlPropsToElements;
const map2 = mapPropsToElementsSvg;

module.exports.getElementSpecificProps = element =>
  [].concat(
    Object.keys(map).reduce(
      (acc, prop) => (map[prop].indexOf(element) >= 0 ? [...acc, prop] : acc),
      []
    ),
    Object.keys(map2).reduce(
      (acc, prop) => (map2[prop].indexOf(element) >= 0 ? [...acc, prop] : acc),
      []
    )
  );
