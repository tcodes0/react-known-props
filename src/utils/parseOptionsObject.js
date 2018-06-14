const { removeLegacy } = require("./removeLegacy");
const { removeNonReactProps } = require("./removeNonReactProps");

module.exports.parseOptionsObject = (input, func) => {
  let out = undefined;

  // catch invalid arguments
  if (input !== undefined && typeof input !== "object") {
    console.error(
      `[react-known-props] Invalid options obect: ${input.toString()}`
    );
    return out;
  }

  // default, no options action
  if (
    input === undefined ||
    Object.keys(input).length === 0 ||
    (input.legacy === false && input.onlyReact === false)
  ) {
    return removeLegacy(func());
  }

  if (input.legacy === true) out = func();
  if (input.legacy === false) out = removeLegacy(func());

  if (input.onlyReact === true)
    out = out ? removeNonReactProps(out) : removeNonReactProps(func());
  if (input.onlyReact === false) out = out ? out : func();

  return out;
};
