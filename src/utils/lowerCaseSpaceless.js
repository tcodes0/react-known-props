const { lowerCase } = require("lodash");

module.exports.lowerCaseSpaceless = input => lowerCase(input).replace(/ /g, "");
