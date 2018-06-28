const { svgReactPropsMap } = require("../build/reactSvgPropsMap");
const { reactExtraPropsMap } = require("../build/reactHtmlPropsMap");
const { htmlGlobalProps, htmlElements } = require("../lists/base/html");
const { svgElements, svgPropsToElementsMap } = require("../lists/base/svg");
const { camelCase } = require("lodash");
const { lowerCase } = require("lodash");
const fs = require("fs");
const {
  htmlPropToReactPropMap,
  reactGlobalProps
} = require("../lists/base/react");

class propList {
  constructor(name, fn) {
    this.name = name;
    this.make = fn;
  }
}

const getElementPropsFromMap = (map, element) =>
  Object.keys(map).reduce(
    (acc, prop) => (map[prop].indexOf(element) >= 0 ? [...acc, prop] : acc),
    []
  );

let lists = [];

lists.push(
  new propList("reactGlobalProps", () => {
    const getReactGlobalProps = [
      ...htmlGlobalProps.reduce((acc, prop) => {
        return htmlPropToReactPropMap[prop]
          ? [...acc, htmlPropToReactPropMap[prop], prop]
          : [...acc, prop];
      }, []),
      ...reactGlobalProps
    ];

    fs.writeFile(
      "./src/lists/reactGlobalProps.js",
      JSON.stringify(getReactGlobalProps, 0, 2) + "\n",
      e => console.table(e) //eslint-disable-line no-console
    );
  })
);

lists.push(
  new propList("reactHtmlElementsToPropsMap", () => {
    const reactHtmlElementsToPropsMap = htmlElements.reduce(
      (acc, el) =>
        Object.assign(acc, {
          [el]: getElementPropsFromMap(reactExtraPropsMap, el)
        }),
      {}
    );

    fs.writeFile(
      "./src/lists/reactHtmlElementsToPropsMap.js",
      JSON.stringify(reactHtmlElementsToPropsMap, 0, 2) + "\n",
      e => console.table(e) //eslint-disable-line no-console
    );
  })
);

lists.push(
  new propList("svgPropToReactPropMap", () => {
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
    const noLower = Object.keys(svgPropsToElementsMap)
      .filter(prop => !/^[a-z0-9]+$/.test(prop))
      .reduce(
        (acc, prop) =>
          Object.assign(acc, { [prop]: svgPropsToElementsMap[prop] }),
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
      .reduce(
        (acc, prop) => Object.assign(acc, { [prop]: camelCase(prop) }),
        {}
      );

    const svgPropToReactPropMap = Object.assign(
      dashToCamel,
      camelToLower,
      edgeCases
    );

    fs.writeFile(
      "./src/lists/svgPropToReactPropMap.js",
      JSON.stringify(svgPropToReactPropMap, 0, 2) + "\n",
      e => console.table(e) //eslint-disable-line no-console
    );
  })
);

lists.push(
  new propList("allSvgHtmlReactProps", () => {
    // removing 4 duplicated props here
    // eslint-disable-next-line
    const { style, title, rel, content, ...svgHtml } = Object.assign(
      svgReactPropsMap,
      reactExtraPropsMap
    );

    fs.writeFile(
      "./src/lists/allSvgHtmlReactProps.js",
      JSON.stringify(Object.keys(svgHtml), 0, 2) + "\n",
      e => console.table(e) //eslint-disable-line no-console
    );
  })
);

lists.push(
  new propList("reactSvgElementsToPropsMap", () => {
    const reactSvgElementsToPropsMap = svgElements.reduce(
      (acc, el) =>
        Object.assign(acc, {
          [el]: getElementPropsFromMap(svgReactPropsMap, el)
        }),
      {}
    );

    fs.writeFile(
      "./src/lists/reactSvgElementsToPropsMap.js",
      JSON.stringify(reactSvgElementsToPropsMap, 0, 2) + "\n",
      e => console.table(e) //eslint-disable-line no-console
    );
  })
);

lists.forEach(list => {
  list.make();
  //eslint-disable-next-line no-console
  console.warn(
    `manually add 'module.exports.${list.name}' to src/lists/${list.name}.js`
  );
});
