const { mapSvgReactProps } = require("../utils/mapSvgToReact");
const { mapReactHtmlProps } = require("../utils/mapReactHtmlProps");
const { propsGlobal } = require("../lists/html");
const { mapHtmlPropToReactProp, propsGlobalReact } = require("../lists/react");
const fs = require("fs");

class staticList {
  constructor(name, fn) {
    this.name = name;
    this.make = fn;
  }
}

let lists = [];

lists.push(
  new staticList("allSvgHtmlReactProps", () => {
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
  })
);

lists.push(
  new staticList("reactGlobalProps", () => {
    const getReactGlobalProps = [
      ...propsGlobal.reduce((acc, prop) => {
        return mapHtmlPropToReactProp[prop]
          ? [...acc, mapHtmlPropToReactProp[prop], prop]
          : [...acc, prop];
      }, []),
      ...propsGlobalReact
    ];

    fs.writeFile(
      "./src/lists/reactGlobalProps.js",
      JSON.stringify(getReactGlobalProps, 0, 2) + "\n",
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
