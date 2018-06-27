const { mapSvgReactProps } = require("../utils/mapSvgToReact");
const { mapReactHtmlProps } = require("../utils/mapReactHtmlProps");
const fs = require("fs");

// removing 4 duplicated props here
// eslint-disable-next-line
const { style, title, rel, content, ...svgHtml } = Object.assign(
  mapSvgReactProps,
  mapReactHtmlProps
);

fs.writeFile(
  "./src/lists/allSvgHtmlReactProps.js",
  JSON.stringify(Object.keys(svgHtml), 0, 2) + "\n",
  e => console.table(e) //eslint-disable-line no-console
);
