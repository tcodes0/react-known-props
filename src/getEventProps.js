const { reactEventprops } = require("./props/react");

module.exports.getEventProps = arg => {
  if (arg)
    //eslint-disable-next-line no-console
    console.warn(
      `[react-known-props] getEventProps: Unexpected argument: '${typeof element}' ${arg}.`
    );

  return reactEventprops;
};
