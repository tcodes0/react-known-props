const { getReactGlobalProps } = require("./getReactGlobalProps");
const { propsGlobalSvg } = require("../lists/svg");
const { elements } = require("../lists/html");
const { mapReactHtmlProps } = require("./mapReactHtmlProps");
const { mapSvgReactProps } = require("./mapSvgToReact");

// html and svg share these elements
const commonElements = [
  "a",
  "audio",
  "canvas",
  "font",
  "iframe",
  "image",
  "script",
  "style",
  "title",
  "video"
];

// make object to remove duplicated keys
const arrayToMap = arr =>
  arr.reduce((acc, p) => Object.assign(acc, { [p]: p }), {});

const ifSvg = (tag, svgFn, htmlFn) =>
  elements.indexOf(element) === -1 ? svgFn() : htmlFn();

const getElementPropsFromMap = (map, element) =>
  Object.keys(map).reduce(
    (acc, prop) =>
      map[prop].indexOf(element) >= 0
        ? Object.assign(acc, { [prop]: prop })
        : acc,
    {}
  );

const mapElementSpecificProps = element =>
  Object.assign(
    getElementPropsFromMap(mapReactHtmlProps, element),
    getElementPropsFromMap(mapSvgReactProps, element)
  );

const mapElementGlobalProps = element => {
  if (commonElements.indexOf(element > -1)) {
    return arrayToMap([...propsGlobalSvg, ...getReactGlobalProps()]);
  }

  //return globalSvg or globalHTML props accordingly
  return elements.indexOf(element) === -1
    ? arrayToMap(propsGlobalSvg)
    : arrayToMap(getReactGlobalProps());
};

module.exports.elementProps = element =>
  Object.keys(
    Object.assign(
      mapElementGlobalProps(element),
      mapElementSpecificProps(element)
    )
  );

// module.exports.elementProps = element => {
//   if (commonElements.indexOf(element > -1)) {
//     // make object to remove duplicated keys
//     return Object.keys(
//       [...propsGlobalSvg, ...getReactGlobalProps()].reduce(
//         (acc, p) => Object.assign(acc, { [p]: p }),
//         {}
//       )
//     );
//   }
//   return elements.indexOf(element) === -1
//     ? propsGlobalSvg
//     : getReactGlobalProps();
// };
