const { camelCase } = require("lodash");
const { mapPropsToElementsSvg } = require("../lists/svg");
const { lowerCase } = require("lodash");

const lowerCaseSpaceless = input => lowerCase(input).replace(/ /g, "");

const camelcaseNoConvert = [
  "externalResourcesRequired",
  "hrefLang",
  "requiredExtensions",
  "requiredFeatures",
  "systemLanguage",
  "glyphRef",
  "attributeName",
  "attributeType",
  "calcMode",
  "keySplines",
  "keyTimes",
  "repeatCount",
  "repeatDur",
  "keyPoints",
  "preserveAspectRatio",
  "pathLength",
  "clipPathUnits",
  "edgeMode",
  "kernelMatrix",
  "kernelUnitLength",
  "preserveAlpha",
  "targetX",
  "targetY",
  "diffuseConstant",
  "surfaceScale",
  "xChannelSelector",
  "yChannelSelector",
  "stdDeviation",
  "tableValues",
  "crossOrigin",
  "specularConstant",
  "specularExponent",
  "limitingConeAngle",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "baseFrequency",
  "numOctaves",
  "stitchTiles",
  "filterRes",
  "filterUnits",
  "primitiveUnits",
  "gradientTransform",
  "gradientUnits",
  "spreadMethod",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "refX",
  "refY",
  "viewBox",
  "maskContentUnits",
  "maskUnits",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "baseProfile",
  "contentScriptType",
  "contentStyleType",
  "zoomAndPan",
  "lengthAdjust",
  "textLength",
  "startOffset",
  "viewTarget"
];

const edgeCases = {
  hreflang: "hrefLang",
  crossorigin: "crossOrigin",
  "nav-down": "navdown",
  "nav-down-left": "navdownleft",
  "nav-down-right": "navdownright",
  "nav-left": "navleft",
  "nav-next": "navnext",
  "nav-prev": "navprev",
  "nav-right": "navright",
  "nav-up": "navup",
  "nav-up-left": "navupleft",
  "nav-up-right": "navupright",
  "horiz-origin-y": "horizoriginy"
};

//remove lowercase props, they are passed as-is to React
const noLower = Object.keys(mapPropsToElementsSvg)
  .filter(prop => !/^[a-z0-9]+$/.test(prop))
  .reduce(
    (acc, prop) => Object.assign(acc, { [prop]: mapPropsToElementsSvg[prop] }),
    {}
  );

//only keep camelCase props, convert to lowercase without spaces.
const camelToLower = Object.keys(noLower)
  .filter(prop => /[a-z][A-Z]/.test(prop))
  .filter(prop => !camelcaseNoConvert.includes(prop))
  .reduce(
    (acc, prop) => Object.assign(acc, { [prop]: lowerCaseSpaceless(prop) }),
    {}
  );

//only keep dashCase props, convert to camelCase.
const dashToCamel = Object.keys(noLower)
  .filter(prop => /[-]/.test(prop))
  .reduce((acc, prop) => Object.assign(acc, { [prop]: camelCase(prop) }), {});

const mapSvgPropToReactProp = Object.assign(
  dashToCamel,
  camelToLower,
  edgeCases
);

module.exports.mapSvgPropToReactProp = mapSvgPropToReactProp;

module.exports.mapSvgReactProps = Object.keys(mapPropsToElementsSvg).reduce(
  (acc, prop) =>
    mapSvgPropToReactProp[prop]
      ? Object.assign(
          acc,
          { [mapSvgPropToReactProp[prop]]: mapPropsToElementsSvg[prop] },
          { [prop]: mapPropsToElementsSvg[prop] }
        )
      : Object.assign(acc, { [prop]: mapPropsToElementsSvg[prop] }),
  {}
);
