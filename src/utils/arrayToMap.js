// make object to remove duplicated keys
module.exports.arrayToMap = arr =>
  arr.reduce((acc, p) => Object.assign(acc, { [p]: p }), {});
