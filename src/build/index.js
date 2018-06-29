const fs = require("fs");
const { execSync } = require("child_process");
const { camelCase, lowerCase } = require("lodash");
const { svgElements, svgPropsToElementsMap } = require("./svgProps");
const { htmlGlobalProps } = require("./htmlProps");
const { reactGlobalProps, reactExtraPropsMap } = require("./reactProps");
const { reactHtmlPropsMap } = require("./reactHtmlPropsMap");
const { reactSvgPropsMap } = require("./reactSvgPropsMap");
const { htmlElements } = require("../lists/base/html");
const { htmlPropToReactPropMap } = require("../lists/base/react");

class propList {
  constructor(name, fn) {
    this.name = name;
    this.data = fn;
  }
}

const getElementPropsFromMap = (map, element) =>
  Object.keys(map).reduce(
    (acc, prop) => (map[prop].indexOf(element) >= 0 ? [...acc, prop] : acc),
    []
  );

let lists = [];

lists.push(
  new propList("reactGlobalProps", () => [
    ...htmlGlobalProps.reduce((acc, prop) => {
      return htmlPropToReactPropMap[prop]
        ? [...acc, htmlPropToReactPropMap[prop], prop]
        : [...acc, prop];
    }, []),
    ...reactGlobalProps
  ])
);

lists.push(
  new propList("reactHtmlElementsToPropsMap", () =>
    htmlElements.reduce(
      (acc, el) =>
        Object.assign(acc, {
          [el]: getElementPropsFromMap(reactHtmlPropsMap, el)
        }),
      {}
    )
  )
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

    return Object.assign(dashToCamel, camelToLower, edgeCases);
  })
);

lists.push(
  new propList("reactSvgElementsToPropsMap", () =>
    svgElements.reduce(
      (acc, el) =>
        Object.assign(acc, {
          [el]: getElementPropsFromMap(reactSvgPropsMap, el)
        }),
      {}
    )
  )
);

lists.push(
  new propList("allSvgHtmlReactProps", () => {
    // removing 4 duplicated props here
    // eslint-disable-next-line
    const { style, title, rel, content, ...svgHtml } = Object.assign(
      reactSvgPropsMap,
      reactHtmlPropsMap,
      reactExtraPropsMap
    );

    return Object.keys(svgHtml);
  })
);

lists.forEach(list => {
  const filePath = `./src/lists/${list.name}.js`;
  const buffer = `module.exports.${list.name} = ${JSON.stringify(
    list.data(),
    0,
    2
  )};\n`;

  fs.writeFileSync(filePath, buffer);
  execSync(`yarn prettier --write ${filePath}`);
});
