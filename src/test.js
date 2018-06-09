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

assert(getAllProps().includes("color"), false, "no legacy in default call");

assert(getAllProps({}).includes("color"), false, "no legacy in empty obj call");

assert(getAllProps(66), undefined, "invalid input return undefined");

assert(
  getAllProps({ legacy: true }).includes("color"),
  true,
  "legacy when options are true"
);

assert(
  getAllProps({ legacy: false }).includes("color"),
  false,
  "no legacy when options are false"
);

assert(
  getElementProps("img").includes("color"),
  false,
  "no legacy in default call"
);

assert(
  getElementProps("img", {}).includes("color"),
  false,
  "no legacy in empty obj call"
);

assert(getElementProps("img", 66), undefined, "invalid input return undefined");

assert(
  getElementProps("table", { legacy: true }).includes("bgcolor"),
  true,
  "legacy when options are true"
);

assert(
  getElementProps("img", { legacy: false }).includes("color"),
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
  "return both classic and react names by default (no flag) element prop"
);

assert(
  getElementProps("div").includes("class") &&
    getElementProps("div").includes("className"),
  true,
  "return both classic and react names by default (no flag) global prop"
);

assert(
  getElementProps("label", { onlyReact: true }).includes("for"),
  false,
  "onlyReact flag set to true omits classic names"
);

assert(
  getElementProps("label", { onlyReact: false }).includes("for"),
  true,
  "onlyReact flag set to false returns classic names"
);

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

assert(
  getElementProps("table", { onlyReact: true, legacy: true }).includes(
    "bgcolor"
  ),
  true,
  "object with two options supported legacy"
);

assert(
  getElementProps("table", { onlyReact: true, legacy: true }).includes("class"),
  false,
  "object with two options supported onlyReact"
);
