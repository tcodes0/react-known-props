module.exports.convertMap = svg =>
  Object.keys(svg).reduce((acc, el) => {
    svg[el].forEach(prop => {
      acc[prop] ? undefined : (acc[prop] = []);
      acc[prop].includes(el) ? undefined : acc[prop].push(el);
    });
    return acc;
  }, {});
