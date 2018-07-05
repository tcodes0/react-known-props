# React Known Props

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

const {
  getAllProps,
  getElementProps,
  getEventProps,
  getGlobalProps
} = require("react-known-props");
```

## API

### Functions provided

- getAllProps
- getElementProps
- getEventProps
- getGlobalProps

**All functions return the props as strings in an array.**

**Element names are case-sensitive and always lowercase.**

**See options below.**

### getAllProps

Gets all possible props: Global props, element specific props, event props and ARIA props including `role`.

```js
// argument 1 (optional): an options object.

getAllProps();
getAllProps({ legacy: true });

//this
getAllProps().length;

//returns
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

//this
getElementProps("img")

//returns
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

//this
getEventProps()

//returns
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

//this
getGlobalProps()

//returns
[ 'accessKey',
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

- **legacy**: boolean.
- **onlyReact**: boolean.

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

Just send PR's. Don't edit the lists `src/generated/*.js` directly, as they are generated from `src/build/index.js`. Lists on `src/build` and `src/build/base` are safe to edit. Run `yarn build:lists` before opening the PR.

All data pulled from MDN web docs, official React docs, the ARIA specification and SVG specification.
MDN can be a deep website to dig for info, I'm sure there are more props (specially legacy) waititing to be added by someone willing to look into every element page.

⚛️ React is awesome 💫
