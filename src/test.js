const {
  getAllProps,
  getElementProps,
  getEventProps,
  getGlobalProps
} = require("./index.js");

const assert = (a, b, name) => {
  if ((a === b) === true) {
    return;
  }

  console.warn(`failed assertion for ${name}`);
};

assert(getAllProps().includes("height"), false, "no legacy in default call");

assert(
  getAllProps({}).includes("height"),
  false,
  "no legacy in empty obj call"
);

assert(getAllProps(66), undefined, "invalid input return undefined");

assert(
  getAllProps({ legacy: true }).includes("height"),
  true,
  "legacy when options are true"
);

assert(
  getAllProps({ legacy: false }).includes("height"),
  false,
  "no legacy when options are false"
);

assert(
  getElementProps("img").includes("height"),
  false,
  "no legacy in default call"
);

assert(
  getElementProps("img", {}).includes("height"),
  false,
  "no legacy in empty obj call"
);

assert(getElementProps("img", 66), undefined, "invalid input return undefined");

assert(
  getElementProps("img", { legacy: true }).includes("height"),
  true,
  "legacy when options are true"
);

assert(
  getElementProps("img", { legacy: false }).includes("height"),
  false,
  "no legacy when options are false"
);
