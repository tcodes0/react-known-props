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

  console.error(`❌ ${name}`);
};

assert(getAllProps().includes("height"), false, "no legacy in default call");

assert(
  getAllProps({}).includes("height"),
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

assert(
  getGlobalProps().includes("dangerouslySetInnerHTML"),
  true,
  "react extras appear on getGlobal"
);

assert(
  getGlobalProps().includes("frameBorder"),
  false,
  "react element extras dont appear on getGlobal"
);

assert(
  getElementProps("frame").includes("allowFullScreen"),
  true,
  "react extras appear on element props"
);

// issue #4
["canvas", "embed", "iframe", "img", "input", "object", "video"].forEach(
  tag => {
    assert(
      getElementProps(tag).includes("height"),
      true,
      `return height as non legacy on ${tag}`
    );
    assert(
      getElementProps(tag).includes("width"),
      true,
      `return width as non legacy on ${tag}`
    );
  }
);

// issue #3
assert(
  getElementProps("label").includes("for") &&
    getElementProps("label").includes("htmlFor"),
  true,
  "return both classic and react names by default (no flag)"
);

try {
  assert(
    getElementProps("label", { onlyReact: true }).includes("for"),
    false,
    "onlyReact flag set to true omits classic names"
  );
} catch (e) {}

try {
  assert(
    getElementProps("label", { onlyReact: false }).includes("for"),
    true,
    "onlyReact flag set to false returns classic names"
  );
} catch (e) {}

// issue #2
assert(
  getElementProps("input").includes("checked") &&
    getElementProps("input").includes("defaultChecked"),
  true,
  "input, return checked and defaultChecked"
);

["input", "textarea"].forEach(tag => {
  assert(
    getElementProps(tag).includes("value") &&
      getElementProps(tag).includes("defaultValue"),
    true,
    `${tag}, return value and defaultValue`
  );
});

assert(
  getElementProps("input", { legacy: true }).includes("checked") &&
    getElementProps("input").includes("defaultChecked"),
  true,
  "input, checked and defaultChecked, legacy true"
);

try {
  ["input", "textarea"].forEach(tag => {
    assert(
      getElementProps(tag).includes("value") &&
        getElementProps(tag, { onlyReact: true }).includes("defaultValue"),
      true,
      `${tag}, value and defaultValue, only react true`
    );
  });
} catch (e) {}
