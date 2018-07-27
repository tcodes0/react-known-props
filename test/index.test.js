const {
  getAllProps,
  getElementProps,
  getEventProps,
  getGlobalProps
} = require("../src/index.js");
const { uniq } = require("lodash");

describe("no duplicated props returned", () => {
  test(`getAllProps()`, () => {
    expect(getAllProps().length).toEqual(uniq(getAllProps()).length);
  });
  test(`getEventProps()`, () => {
    expect(getEventProps().length).toEqual(uniq(getEventProps()).length);
  });
  test(`getGlobalProps()`, () => {
    expect(getGlobalProps().length).toEqual(uniq(getGlobalProps()).length);
  });
  test(`getElementProps(<html>)`, () => {
    expect(getElementProps("div").length).toEqual(
      uniq(getElementProps("div")).length
    );
  });
  test(`getElementProps(<svg>)`, () => {
    expect(getElementProps("polygon").length).toEqual(
      uniq(getElementProps("polygon")).length
    );
  });
  test(`getElementProps(<html>) {only: react}`, () => {
    expect(getElementProps("div", { onlyReact: true }).length).toEqual(
      uniq(getElementProps("div", { onlyReact: true })).length
    );
  });
  test(`getElementProps(<svg>) {only: react}`, () => {
    expect(getElementProps("polygon", { onlyReact: true }).length).toEqual(
      uniq(getElementProps("polygon", { onlyReact: true })).length
    );
  });
});

describe("Bad options input", () => {
  test("getAllProps throws for int", () => {
    expect(() => getAllProps(66)).toThrow("Expected an object with options");
  });
  test("getAllProps throws for string", () => {
    expect(() => getAllProps("foo")).toThrow("Expected an object with options");
  });
  test("getAllProps throws for bool", () => {
    expect(() => getAllProps(true)).toThrow("Expected an object with options");
  });
  test("getEventProps prints a warning", () => {
    console.warn = jest.fn(); //eslint-disable-line no-console
    getEventProps(66);
    expect(console.warn).toHaveBeenCalled(); //eslint-disable-line no-console
  });
  test("getElementProps throws for int", () => {
    expect(() => getElementProps("img", 66)).toThrow(
      "Expected an object with options"
    );
  });
  test("getElementProps throws for string", () => {
    expect(() => getElementProps("img", "foo")).toThrow(
      "Expected an object with options"
    );
  });
  test("getElementProps throws for bool", () => {
    expect(() => getElementProps("img", true)).toThrow(
      "Expected an object with options"
    );
  });
  test("getGlobalProps throws for int", () => {
    expect(() => getGlobalProps(66)).toThrow("Expected an object with options");
  });
  test("getGlobalProps throws for string", () => {
    expect(() => getGlobalProps("foo")).toThrow(
      "Expected an object with options"
    );
  });
  test("getGlobalProps throws for bool", () => {
    expect(() => getGlobalProps(true)).toThrow(
      "Expected an object with options"
    );
  });
});

describe("getAllProps", () => {
  test("no duplicated props returned", () => {
    expect(getAllProps().length).toEqual(uniq(getAllProps()).length);
  });
  test("{} returns default", () => {
    expect(getAllProps()).toEqual(getAllProps({}));
  });
  test("no legacy props in default call", () => {
    expect(getAllProps().includes("bgcolor")).toBe(false);
    expect(getAllProps().includes("border")).toBe(false);
  });
  test("no legacy props with {legacy: false}", () => {
    expect(getAllProps({ legacy: false }).includes("bgcolor")).toBe(false);
    expect(getAllProps({ legacy: false }).includes("border")).toBe(false);
  });
  test("legacy props with {legacy: true}", () => {
    expect(getAllProps({ legacy: true }).includes("color")).toBe(true);
    expect(getAllProps({ legacy: true }).includes("bgcolor")).toBe(true);
    expect(getAllProps({ legacy: true }).includes("border")).toBe(true);
  });
});

describe("getEventProps", () => {
  test("{} returns default", () => {
    expect(getEventProps()).toEqual(getEventProps({}));
  });
  test("all props match /^on[A-Z]/", () => {
    expect(getEventProps().filter(p => /^on[A-Z]/.test(p))).toEqual(
      getEventProps()
    );
  });
});

describe("getGlobalProps", () => {
  test("onlyReact works as expected", () =>
    expect(getGlobalProps({ onlyReact: true }).includes("class")).toBeFalsy());
});

describe("getElementProps", () => {
  test("{} returns default", () => {
    expect(getElementProps("img")).toEqual(getElementProps("img", {}));
  });

  test("no legacy props in default call", () => {
    expect(getElementProps("img").includes("color")).toBe(false);
    expect(getElementProps("img").includes("bgcolor")).toBe(false);
    expect(getElementProps("img").includes("border")).toBe(false);
  });
  test("no legacy props with {legacy: false}", () => {
    expect(getElementProps("img", { legacy: false }).includes("color")).toBe(
      false
    );
    expect(getElementProps("img", { legacy: false }).includes("bgcolor")).toBe(
      false
    );
    expect(getElementProps("img", { legacy: false }).includes("border")).toBe(
      false
    );
  });
  test("legacy props with {legacy: true}", () => {
    expect(getElementProps("hr", { legacy: true }).includes("color")).toBe(
      true
    );
    expect(getElementProps("body", { legacy: true }).includes("bgcolor")).toBe(
      true
    );
    expect(getElementProps("object", { legacy: true }).includes("border")).toBe(
      true
    );
  });
});

describe("react extras", () => {
  test("react global extras appear on getGlobal", () => {
    expect(getGlobalProps().includes("dangerouslySetInnerHTML")).toBe(true);
  });
  test("react element extras dont appear on getGlobal", () => {
    expect(getGlobalProps().includes("frameBorder")).toBe(false);
  });
  test("react extras appear on element props", () => {
    expect(getElementProps("frame").includes("allowFullScreen")).toBe(true);
  });
});

describe("issue #4, height width ", () => {
  ["canvas", "embed", "iframe", "img", "input", "object", "video"].forEach(
    tag => {
      test(`return height as non legacy on ${tag}`, () => {
        expect(getElementProps(tag).includes("height")).toBe(true);
      });
      test(`return width as non legacy on ${tag}`, () => {
        expect(getElementProps(tag).includes("width")).toBe(true);
      });
    }
  );
});

describe("return both names #3", () => {
  test("return both names by default, getElementProps(label)", () => {
    expect(
      getElementProps("label").includes("for") &&
        getElementProps("label").includes("htmlFor")
    ).toBe(true);
  });
  test("return both names by default, getElementProps(div)", () => {
    expect(
      getElementProps("div").includes("class") &&
        getElementProps("div").includes("className")
    ).toBe(true);
  });
  test("onlyReact true omits classic names", () => {
    expect(getElementProps("label", { onlyReact: true }).includes("for")).toBe(
      false
    );
  });
  test("onlyReact false returns classic names", () => {
    expect(getElementProps("label", { onlyReact: false }).includes("for")).toBe(
      true
    );
  });
  test("return both names by default, getGlobal", () => {
    expect(
      getGlobalProps().includes("class") &&
        getGlobalProps().includes("className")
    ).toBe(true);
  });
});

describe("checked defaultChecked #2", () => {
  test("input, return checked and defaultChecked", () => {
    expect(
      getElementProps("input").includes("checked") &&
        getElementProps("input").includes("defaultChecked")
    ).toBe(true);
  });
  test("input, return checked and defaultChecked with legacy: true", () => {
    expect(
      getElementProps("input", { legacy: true }).includes("checked") &&
        getElementProps("input").includes("defaultChecked")
    ).toBe(true);
  });
  ["input", "textarea"].forEach(tag => {
    test(`${tag}, return value and defaultValue`, () => {
      expect(
        getElementProps(tag).includes("value") &&
          getElementProps(tag).includes("defaultValue")
      ).toBe(true);
    });
  });
});

describe("multiple options in an object", () => {
  test("object with two options supports legacy", () => {
    expect(
      getElementProps("table", { onlyReact: true, legacy: true }).includes(
        "bgcolor"
      )
    ).toBe(true);
  });
  test("object with two options supports onlyReact", () => {
    expect(
      getElementProps("table", { onlyReact: true, legacy: true }).includes(
        "class"
      )
    ).toBe(false);
  });
});

describe("add aria #5", () => {
  test("aria prop in getGlobal, default options", () => {
    expect(getGlobalProps().includes("aria-expanded")).toBe(true);
  });
  test("aria prop in getElement, default options", () => {
    expect(getElementProps("dt").includes("aria-expanded")).toBe(true);
  });
  test("aria prop in getAll, default options", () => {
    expect(getAllProps().includes("aria-expanded")).toBe(true);
  });
});

describe("Include svg elements and props #6", () => {
  test("getAll() returns global svg props", () =>
    expect(getAllProps().includes("typeof")).toBe(true));

  test("getAll() returns element svg props", () =>
    expect(getAllProps().includes("focusable")).toBe(true));

  test("getAll() {onlyreact: true} returns only react", () =>
    expect(
      getAllProps({ onlyReact: true }).includes("alignmentBaseline") &&
        !getAllProps({ onlyReact: true }).includes("alignment-baseline")
    ).toBe(true));

  test("getAll() {onlyreact: false} returns react and svg", () =>
    expect(
      getAllProps({ onlyReact: false }).includes("alignmentBaseline") &&
        getAllProps({ onlyReact: false }).includes("alignment-baseline")
    ).toBe(true));

  test("getAll() {} returns react and svg", () =>
    expect(
      getAllProps({ onlyReact: false }).includes("alignmentBaseline") &&
        getAllProps({ onlyReact: false }).includes("alignment-baseline")
    ).toBe(true));

  test("getElement(<svg>) returns element svg props", () =>
    expect(getElementProps("ellipse").includes("cx")).toBe(true));

  test("getElement(<svg>) returns global svg props", () =>
    expect(getElementProps("ellipse").includes("typeof")).toBe(true));

  test("getElement for elements both in html and svg has no duplicate props", () =>
    expect(getElementProps("video")).toEqual(uniq(getElementProps("video"))));

  test("getElement(<svg>) {onlyreact: true} returns only react", () =>
    expect(
      getElementProps("ellipse", { onlyReact: true }).includes(
        "alignmentBaseline"
      ) &&
        !getElementProps("ellipse", { onlyReact: true }).includes(
          "alignment-baseline"
        )
    ).toBe(true));

  test("getElement(<svg>) {onlyreact: false} returns react and svg", () =>
    expect(
      getElementProps("ellipse", { onlyReact: false }).includes(
        "alignmentBaseline"
      ) &&
        getElementProps("ellipse", { onlyReact: false }).includes(
          "alignment-baseline"
        )
    ).toBe(true));

  test("getElement(<svg>) {} returns react and svg", () =>
    expect(
      getElementProps("ellipse").includes("alignmentBaseline") &&
        getElementProps("ellipse").includes("alignment-baseline")
    ).toBe(true));

  test("getEventProps returns NO svg props", () =>
    expect(getEventProps().includes("cx")).toBe(false));

  test("getGlobalProps returns svg global props", () =>
    expect(getGlobalProps().includes("typeof")).toBe(true));
});

describe("getElementProps bad element arg", () => {
  [
    { name: "nonsense string", value: "dufhud" },
    { name: "wrong case", value: "IMG" },
    { name: "wrong type", value: 54 },
    { name: "undefined", value: undefined }
  ].forEach(t => {
    test(`warning invalid: ${t.name}`, () => {
      console.warn = jest.fn(); //eslint-disable-line no-console
      getElementProps(t.value);
      expect(console.warn).toHaveBeenCalled(); //eslint-disable-line no-console
    });
  });

  test("return globals nonetheless", () => {
    expect(getElementProps("IMG")).toEqual(getGlobalProps());
  });
});

describe("sort option", () => {
  test("getElementProps div {sort: false} is not sorted", () => {
    expect(getElementProps("div", { sort: false })).not.toEqual(
      getElementProps("div").sort()
    );
  });
  test("getElementProps feFlood {sort: false} is not sorted", () => {
    expect(getElementProps("feFlood", { sort: false })).not.toEqual(
      getElementProps("feFlood").sort()
    );
  });
  test("getElementProps {sort: false} is default", () => {
    expect(getElementProps("feFlood", { sort: false })).toEqual(
      getElementProps("feFlood")
    );
  });
  test("getElementProps div {sort: true} works", () => {
    expect(getElementProps("div", { sort: true })).toEqual(
      getElementProps("div").sort()
    );
  });
  test("getElementProps feFlood {sort: true} works", () => {
    expect(getElementProps("feFlood", { sort: true })).toEqual(
      getElementProps("feFlood").sort()
    );
  });
  test("getAllProps {sort: true} works", () => {
    expect(getAllProps({ sort: true })).toEqual(getAllProps().sort());
  });
  test("getAllProps {sort: false} is default", () => {
    expect(getAllProps()).toEqual(getAllProps({ sort: false }));
  });
  test("getAllProps {sort: false} is not sorted", () => {
    expect(getAllProps({ sort: false })).not.toEqual(getAllProps().sort());
  });
  test("getGlobalProps {sort: true} works", () => {
    expect(getGlobalProps({ sort: true })).toEqual(getGlobalProps().sort());
  });
  test("getGlobalProps {sort: false} is default", () => {
    expect(getGlobalProps({ sort: false })).toEqual(getGlobalProps());
  });
  test("getGlobalProps {sort: false} is not sorted", () => {
    expect(getGlobalProps({ sort: false })).not.toEqual(
      getGlobalProps().sort()
    );
  });
});
