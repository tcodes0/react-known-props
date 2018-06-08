const { propsGlobal, mapPropsToElements } = require("./htmlProps");

const mapHtmlToReact = {
  allowtransparency: "allowTransparency",
  charset: "charSet",
  class: "className",
  for: "htmlFor",
  ismap: "isMap",
  itemid: "itemID",
  typemustmatch: "typeMustMatch"
};

const propsEvents = [
  "onBlur",
  "onChange",
  "onClick",
  "onContextMenu",
  "onCopy",
  "onCut",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onFocus",
  "onInput",
  "onKeyDown",
  "onKeyPress",
  "onKeyUp",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onPaste",
  "onScroll",
  "onSubmit",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "onWheel",
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",
  "onInvalid",
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut",
  "onSelect",
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onError",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting",
  "onLoad",
  "onError",
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration",
  "onTransitionEnd",
  "onToggle"
];

const propsGlobalReact = propsGlobal.map(
  prop => (mapHtmlToReact[prop] ? mapHtmlToReact[prop] : prop)
);

const mapReactPropsToElements = Object.keys(mapPropsToElements).reduce(
  (acc, prop) => {
    return mapHtmlToReact[prop]
      ? Object.assign(acc, { [mapHtmlToReact[prop]]: mapPropsToElements[prop] })
      : Object.assign(acc, {
          [prop]: mapPropsToElements[prop]
        });
  },
  {}
);

module.exports.propsEvents = propsEvents;
module.exports.propsGlobalReact = propsGlobalReact;
module.exports.mapReactPropsToElements = mapReactPropsToElements;
