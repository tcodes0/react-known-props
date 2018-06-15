# React Known Props

A list of all props React groks.
- Html & svg props valid on any element (I call them global).
- Html & svg element specific props.
- Aria props (includes `role`).
- React event props.
- React specific props.
- Options to control output.

## Usage

install with
```sh
yarn add react-known-props
```

then use with
```js
import { getAllProps, getElementProps, getEventProps, getGlobalProps } from 'react-known-props'
```

### API

**All functions return props as strings in an array.**

> getAllProps

Gets all possible props: global props, element specific props, event props and aria props including `role`.
```js
// argument 1 (optional): an options object.

getAllProps()
getAllProps({legacy: true})

//this
getAllProps().length

//returns
674
```
> getElementProps

Gets all props valid on the element provided as argument, plus all aria props, including `role`. Doesn't include event props.
```js
// argument 1: string. Html element to get props for.
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
> getEventProps

Gets all React's event props only.
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
> getGlobalProps

Gets all html and svg props valid on any element, plus all aria props including `role`.
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

#### Options supported in an object:
- **legacy**: _boolean_. Default: false.

Whether or not to return deprecated html props _bgcolor_, _border_ and _color_ for the elements that use them.
```js
// examples:

// will include bgcolor in the props
getAllProps({legacy: true})

// will omit legacy props
getAllProps({legacy: false})

// same as {legacy: false}
getAllProps()
```

-  **onlyReact**: _boolean_. Default: false.

Whether to return only the React version of a prop, or both versions. In React, some html props are used in camelCase and using the classic lowercase name will show a warning. Same with svg. Since the warning can be educational this option is off by default.
```js
// examples:

// will include class and className, for and htmlFor, etc...
getElementProps("label")

// same as above
getElementProps("label", {onlyReact: false})

// no duplication, only React names are returned (itemID, tabIndex, autoCapitalize, className, htmlFor, etc...)
getGlobalProps({onlyReact: true})
```

#### Some svg props not included

React doesn't like all svg props, some prevent it from compiling and print an error to console. They are:
 - All prefixed by xml:*
 - All prefixed by xlink:*
 - All prefixed by on* (events)
 - ev:event.

#### Need more props?

I'd use these packages:

- void html elements (\<img\/\>): `yarn add void-elements`
- css props: `yarn add known-css-properties`

### Contributing

All data pulled from MDN web docs, official React docs, the aria specification and svg specification.
MDN can be a deep website to dig for info, I'm sure there are more props (specially legacy) waititing to be added by someone willing to look into every element page.

⚛️ React is awesome 💫