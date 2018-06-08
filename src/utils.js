const { globalProps, elementPropMap } = require("./htmlProps");

// repeated global props on element maps are logged to console
Object.keys(elementPropMap).forEach(k => {
  elementPropMap[k].forEach(
    prop =>
      globalProps.includes(prop) ? console.log(`${k} - ${prop}`) : undefined
  );
});
