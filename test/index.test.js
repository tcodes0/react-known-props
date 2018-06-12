const {
  getAllProps,
  getElementProps,
  getEventProps,
  getGlobalProps
} = require("../src/index.js");

describe("getAllProps", () => {
  describe("invalid input", () => {
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

describe("issue 3, return both names", () => {
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

describe("issue 2, checked defaultChecked", () => {
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

describe("issue 5, add aria", () => {
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

// describe("bar", () => {
//   test("foo", () => {
//     expect(true).toBe(true);
//   });
// });
