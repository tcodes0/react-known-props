# React Known Props

Simple functions to get arrays of props, both from React and html, renamed for React when appropriate (class => className).
Because you may want to test props against it.

### v2 update:
 - Now exposing functions! _⒡ ↬_ ✨
 - Find props per html element.
 - Many React specific props covered.
 - Options to include legacy props. _(default off)_

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

Gets all possible props including all global props, all element specific props and all event props.
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
getElementProps("audio", {}) //same as {legacy: false}
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
getGlobalProps({legacy: true})
```

#### Options supported in an object:
-  legacy: _boolean_

Wether or not to return deprecated html props.
```js
//defaults to false
{legacy: true}
{legacy: false}
```

## Need more props?

I'd use these packages:

- aria props: `yarn add aria-attributes`
- svg props: `yarn add svg-tag-names`
- void html elements (\<img\/\>): `yarn add void-elements`
- css props: `yarn add known-css-properties`