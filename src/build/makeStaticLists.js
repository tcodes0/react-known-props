const { svgReactPropsMap } = require("../build/reactSvgPropsMap");
const { reactHtmlPropsMap } = require("../build/reactHtmlPropsMap");
const { htmlGlobalProps, htmlElements } = require("../lists/html");
const { svgElements } = require("../lists/svg");
const { htmlPropToReactPropMap, propsGlobalReact } = require("../lists/react");
const fs = require("fs");

class staticList {
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
  new staticList("allSvgHtmlReactProps", () => {
    // removing 4 duplicated props here
    // eslint-disable-next-line
    const { style, title, rel, content, ...svgHtml } = Object.assign(
      svgReactPropsMap,
      reactHtmlPropsMap
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
      ...htmlGlobalProps.reduce((acc, prop) => {
        return htmlPropToReactPropMap[prop]
          ? [...acc, htmlPropToReactPropMap[prop], prop]
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

lists.push(
  new staticList("reactHtmlElementToPropsMap", () => {
    const reactHtmlElementToPropsMap = htmlElements.reduce(
      (acc, el) =>
        Object.assign(acc, {
          [el]: getElementPropsFromMap(reactHtmlPropsMap, el)
        }),
      {}
    );

    fs.writeFile(
      "./src/lists/reactHtmlElementToPropsMap.js",
      JSON.stringify(reactHtmlElementToPropsMap, 0, 2) + "\n",
      e => console.table(e) //eslint-disable-line no-console
    );
  })
);

lists.push(
  new staticList("reactSvgElementToPropsMap", () => {
    const reactSvgElementToPropsMap = svgElements.reduce(
      (acc, el) =>
        Object.assign(acc, {
          [el]: getElementPropsFromMap(svgReactPropsMap, el)
        }),
      {}
    );

    fs.writeFile(
      "./src/lists/reactSvgElementToPropsMap.js",
      JSON.stringify(reactSvgElementToPropsMap, 0, 2) + "\n",
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
