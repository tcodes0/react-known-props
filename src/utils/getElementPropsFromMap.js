module.exports.getElementPropsFromMap = (map, element) =>
  Object.keys(map).reduce(
    (acc, prop) =>
      map[prop].indexOf(element) >= 0
        ? Object.assign(acc, { [prop]: prop })
        : acc,
    {}
  );
