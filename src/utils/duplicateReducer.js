module.exports.duplicateReducer = (acc, value, key, arr) => [
  ...acc,
  ...(arr.filter(x => x === value).length > 1 && acc.indexOf(value) === -1
    ? value
    : [])
];
