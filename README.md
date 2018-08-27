# React Known Props [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=About%20700%20props%20React%20recognizes&url=https://github.com/thomazella/react-known-props&via=thomazella9&hashtags=developers,react,props,opensource)

<p>
  <a href="https://travis-ci.org/Thomazella/react-known-props"><img src="https://img.shields.io/travis/Thomazella/react-known-props/master.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://www.npmjs.com/package/react-known-props"><img src="https://img.shields.io/npm/v/react-known-props.svg?style=flat-square" alt="Latest version" /></a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-known-props">
    <img alt="downloads/month" src="https://img.shields.io/npm/dt/react-known-props.svg?style=flat-square">
  </a>
</p>
<br/>


About 700 props React recognizes.

- HTML & SVG props valid on any element (global props).
- HTML & SVG element specific props.
- ARIA props (includes `role`).
- React event props.
- React specific props.
- Options you can set.

## Install

install with

```sh
yarn add react-known-props
```

```sh
npm i react-known-props
```

then use with

```js
import {
  getAllProps,
  getElementProps,
  getEventProps,
  getGlobalProps
} from "react-known-props";
```

```js
const {
  getAllProps,
  getElementProps,
  getEventProps,
  getGlobalProps
} = require("react-known-props");
```

## API

### Functions provided

- [getAllProps](#getallprops)
- [getElementProps](#getelementprops)
- [getEventProps](#geteventprops)
- [getGlobalProps](#getglobalprops)

**All functions return the props as strings in an array.**

**Element names are case-sensitive**<br/>

- HTML elements are all lowercase
- SVG elements are lowercase and camelCase

**See options [below](#options).**

### getAllProps

Gets all possible props: Global props, element specific props, event props and ARIA props including `role`.

```js
// argument 1 (optional): an options object.

getAllProps();
getAllProps({ legacy: true });

// this
getAllProps().length;

// returns
675;
```

### getElementProps

Gets all props valid on the HTML/SVG element provided as argument, plus all ARIA props, including `role`. Doesn't include event props.

```js
// argument 1: string. Element to get props for.
// argument 2: (optional) an options object.

getElementProps("img")
getElementProps("iframe")
getElementProps("ellipse")
getElementProps("table", {legacy: true})
getElementProps("audio", {onlyReact: true})
getElementProps("polygon", {onlyReact: true})

// this
getElementProps("img")

// returns
[ 'align',
      'alt',
      'crossOrigin',
      'crossorigin',
      'height',
      'isMap',
      'ismap',
      'sizes',
      (...)
]
```

### getEventProps

Gets React's event props only.

```js
// arguments: none.

// this
getEventProps()

// returns
[ 'onBlur',
      'onChange',
      'onClick',
      'onContextMenu',
      'onCopy',
      'onCut',
      (...)
]
```

### getGlobalProps

Gets all HTML and SVG props valid on any element, plus all ARIA props including `role`.

```js
// argument 1 (optional): an options object.

getGlobalProps()
getGlobalProps({onlyReact: true})

// this
getGlobalProps()

// returns
[
  'accessKey',
  'accesskey',
  'autoCapitalize',
  'autocapitalize',
  'className',
  'class',
  'contentEditable',
  'contenteditable',
  (...)
]
```

### Options

- **[legacy](#legacy)**: boolean.
- **[onlyReact](#onlyreact)**: boolean.
- **[sort](#sort)**: boolean.

#### legacy

_Default: false._

Whether or not to return deprecated HTML props `bgcolor`, `border` and `color` for the elements that still use them.

```js
// examples:

// will include bgcolor in the props
getAllProps({ legacy: true });

// will omit legacy props
getAllProps({ legacy: false });

// same as {legacy: false}
getAllProps();
```

#### onlyReact

_Default: false._

Whether to return only the React prop, or the HTML prop and the React prop.
In React, some HTML props are renamed to camelCase (e.g. `class` -> `className`) and using the HTML lowercase name will show a warning.
The same happens with SVG.
Since the warning can be educational this option is off by default.

```js
// examples:

// will include class and className, for and htmlFor, etc...
getElementProps("label");

// same as above
getElementProps("label", { onlyReact: false });

// no duplication, only React props are returned (itemID, tabIndex, autoCapitalize, className, htmlFor, etc...)
getGlobalProps({ onlyReact: true });
```

#### sort

_Default: false\*._

Sort the props alphabetically before returning them.
It uses `Array.prototype.sort`.<br/>
Not suported on \*[getEventProps](#geteventprops).
Please sort it manually.

```js
// examples:

getAllProps();
// not sorted
[
  (...)
  'aria-valuetext',
  'role',
  'accessKey',
  'accesskey',
  'autoCapitalize',
  'autocapitalize',
  'className',
  'class',
  (...)
]

// sorted
getAllProps({ sort: true });
getGlobalProps({ sort: true });
```

_Incompatible SVG props not included._

React doesn't like all SVG props, some prevent it from compiling and print an error to the console.
They are:

- Props prefixed by `xml:`
- Props prefixed by `xlink:`
- Props prefixed by `on` (events)
- `ev:event`

_Need more props?_

I'd use these packages:

- Void HTML elements (self closing, e.g. \<img\/\>): `yarn add void-elements`
- Css props: `yarn add known-css-properties`

### Contributing

Fork, make changes, run the `build:lists` script and send a PR.
`build:lists` takes the stuff in `src/generator` and makes the files in `src/generated`.
This is for performance reasons.

All data pulled from MDN web docs, official React docs, the ARIA specification and SVG specification.
MDN can be a deep website to dig for info, I'm sure there are more props (specially legacy) waititing to be added by someone willing to look into every element page.

⚛️ React is awesome 💫
