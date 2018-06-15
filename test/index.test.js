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
    expect(getElementProps("div").length).toEqual(uniq(method()).length);
  });
  test(`getElementProps(<svg>)`, () => {
    expect(getElementProps("polygon").length).toEqual(uniq(method()).length);
  });
  test(`getElementProps(<html>) {only: react}`, () => {
    expect(getElementProps("div", { onlyReact: true }).length).toEqual(
      uniq(method()).length
    );
  });
  test(`getElementProps(<svg>) {only: react}`, () => {
    expect(getElementProps("polygon", { onlyReact: true }).length).toEqual(
      uniq(method()).length
    );
  });
});

describe("getAllProps", () => {
  describe("behavior on invalid input", () => {
    test("int", () => {
      expect(getAllProps(66)).toBe(undefined);
    });
    test("string", () => {
      expect(getAllProps("foo")).toBe(undefined);
    });
    test("bool", () => {
      expect(getAllProps(true)).toBe(undefined);
    });
  });
  test("{} returns default", () => {
    expect(getAllProps()).toEqual(getAllProps({}));
  });
  test("no legacy props in default call", () => {
    expect(getAllProps().includes("color")).toBe(false);
    expect(getAllProps().includes("bgcolor")).toBe(false);
    expect(getAllProps().includes("border")).toBe(false);
  });
  test("no legacy props with {legacy: false}", () => {
    expect(getAllProps({ legacy: false }).includes("color")).toBe(false);
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
  describe("invalid input", () => {
    test("int", () => {
      expect(getEventProps(66)).toBe(getEventProps());
    });
  });
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
  test("getGlobalProps with onlyReact is default", () =>
    expect(getGlobalProps()).toEqual(getGlobalProps({ onlyReact: true })));
});

describe("getElementProps", () => {
  describe("invalid input", () => {
    test("int", () => {
      expect(getElementProps("img", 66)).toBe(undefined);
    });
    test("string", () => {
      expect(getElementProps("img", "foo")).toBe(undefined);
    });
    test("bool", () => {
      expect(getElementProps("img", true)).toBe(undefined);
    });
  });
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

describe("issue 4, height width ", () => {
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
  test("return both names by default, getElement", () => {
    expect(
      getElementProps("label").includes("for") &&
        getElementProps("label").includes("htmlFor")
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
      getElementProps("div").includes("class") &&
        getElementProps("div").includes("className")
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
