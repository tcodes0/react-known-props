# React Known Props

A list of html attributes and events used in React.
Because you may want to test props against these.

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

About 200 props.