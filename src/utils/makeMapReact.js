const { camelCase } = require("lodash");
const { lowerCaseSpaceless } = require("../utils/lowerCaseSpaceless");

module.exports.makeMapToReact = mapPropsToElements => {
  //remove lowercase props, they are passed as-is to React
  const noLower = Object.keys(mapPropsToElements)
    .filter(prop => !/^[a-z0-9]+$/.test(prop))
    .reduce(
      (acc, prop) => Object.assign(acc, { [prop]: mapPropsToElements[prop] }),
      {}
    );

  //only keep camelCase props, convert to lowercase without spaces.
  const camelToLower = Object.keys(noLower)
    .filter(prop => /[a-z][A-Z]/.test(prop))
    .reduce(
      (acc, prop) => Object.assign(acc, { [prop]: lowerCaseSpaceless(prop) }),
      {}
    );

  //only keep dashCase props, convert to camelCase.
  const dashToCamel = Object.keys(noLower)
    .filter(prop => /[-]/.test(prop))
    .reduce((acc, prop) => Object.assign(acc, { [prop]: camelCase(prop) }), {});

  return Object.assign(dashToCamel, camelToLower);
};
