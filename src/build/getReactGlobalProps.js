const { propsGlobal } = require("../lists/html");
const { mapHtmlPropToReactProp, propsGlobalReact } = require("../lists/react");
const fs = require("fs");

const getReactGlobalProps = propsGlobal
  .reduce((acc, prop) => {
    return mapHtmlPropToReactProp[prop]
      ? [...acc, mapHtmlPropToReactProp[prop], prop]
      : [...acc, prop];
  }, [])
  .concat(propsGlobalReact);

fs.writeFile(
  "./src/lists/reactGlobalProps.js",
  JSON.stringify(getReactGlobalProps, 0, 2) + "\n",
  e => console.table(e) //eslint-disable-line no-console
);

console.warn("manually add 'module.exports... to src/lists/reactGlobalProps'"); //eslint-disable-line no-console
