const { propsLegacyGlobal } = require("../lists/html");

module.exports.removeLegacy = arr =>
  arr.filter(prop => propsLegacyGlobal.indexOf(prop) === -1);
