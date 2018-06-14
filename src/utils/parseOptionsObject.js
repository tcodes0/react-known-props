const { removeLegacy } = require("./removeLegacy");
const { removeNonReactProps } = require("./removeNonReactProps");
const { uniq } = require("lodash");

module.exports.parseOptionsObject = (input, func) => {
  let out = undefined;
  const uniqFunc = () => uniq(func());

  if (input !== undefined && typeof input !== "object") {
    console.error(
      `[react-known-props] Invalid options obect: ${input.toString()}`
    );
    return out;
  }

  if (
    input === undefined ||
    Object.keys(input).length === 0 ||
    (input.legacy === false && input.onlyReact === false)
  ) {
    return removeLegacy(uniqFunc());
  }

  if (input.legacy === true) out = uniqFunc();
  if (input.legacy === false) out = removeLegacy(uniqFunc());

  if (input.onlyReact === true)
    out = out ? removeNonReactProps(out) : removeNonReactProps(uniqFunc());
  if (input.onlyReact === false) out = out ? out : uniqFunc();

  return out;
};
