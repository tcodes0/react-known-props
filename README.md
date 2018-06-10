# React Known Props

A list of all props React groks.
- Html attribute props.
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

Gets all possible props, including all global props, all element specific props and all event props.
```js
// argument 1 (optional): an options object.

getAllProps()
getAllProps({legacy: true})
```
> getElementProps

Gets all html props valid on the element provided as argument. Doesn't include event props.
```js
// argument 1: string. Html element to get props for.
// argument 2: (optional) an options object.

getElementProps("img")
getElementProps("iframe")
getElementProps("table", {legacy: true})
getElementProps("audio", {onlyReact: true})
```
> getEventProps

Gets all React's event props.
```js
// arguments: none.

getEventProps()
```
> getGlobalProps

Gets all html props valid on any element.
```js
// argument 1 (optional): an options object.

getGlobalProps()
getGlobalProps({onlyReact: true})
```

#### Options supported in an object:
- **legacy**: _boolean_. Default: false.

Wether or not to return deprecated html props _bgcolor_, _border_ and _color_ for the elements that use them.
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

Wether to return only the React version of a prop, or both versions. Some props changed to camelCase and using the classic lowercase name will show a warning. Since the warning can be educational this option is off by default.
```js
// examples:

// will include class and className, for and htmlFor, etc...
getElementProps("label")

// same as above
getElementProps("label", {onlyReact: false})

// returns only the React name of the props (itemID, tabIndex, autoCapitalize, etc...)
getGlobalProps({onlyReact: true})
```

#### Need more props?

I'd use these packages:

- aria props: `yarn add aria-attributes`
- svg props: `yarn add svg-tag-names`
- void html elements (\<img\/\>): `yarn add void-elements`
- css props: `yarn add known-css-properties`

### Contributing

All data pulled from MDN web docs and official React docs.
MDN can be a deep website to dig for info, I'm sure there are more props (specially legacy) waititing to be added by someone willing to look into every element page.

⚛️ React is awesome 💫