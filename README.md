# React Known Props

A list of html props and event props used in React.
Because you may want to test props against it.

## Need more props?

I'd use these packages:

- aria props: `yarn add aria-attributes`
- svg props: `yarn add svg-tag-names`
- void html elements (\<img\/\>): `yarn add void-elements`
- css props: `yarn add known-css-properties`
- html props, by tag type: `yarn add react-html-attributes`

## Usage

install with
```sh
yarn add react-known-props
```

then use with
```js
import knownProps from 'react-known-props'
```

The props are in an array.
```js
console.log(knownProps)
//logs
[ 'abbr',
  'accept',
  'acceptCharset',
  'accessKey',
  'action',
  'allowFullScreen',
  'allowTransparency',
  'alt',
  'async',
  (...)
```

About 200~ props.

Event props all begin with string `on` followed by an uppercase letter, so a way to filter the array and keep only the event props could be...
```js
knownProps.filter(prop => /^on[A-Z]/.test(prop))
```