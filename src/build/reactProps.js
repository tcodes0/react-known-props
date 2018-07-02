module.exports.reactGlobalProps = [
  "dangerouslySetInnerHTML",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "classID",
  "keyParams",
  "autoSave"
];

module.exports.reactExtraPropsMap = {
  defaultChecked: ["input"],
  autoCorrect: ["input"],
  defaultValue: ["input", "textarea", "select"],
  value: ["input", "textarea", "select"],
  allowFullScreen: ["frame"],
  cellPadding: ["table"],
  cellSpacing: ["table"],
  controlsList: ["audio", "video"],
  frameBorder: ["frame"],
  inputMode: ["input"],
  marginHeight: ["iframe"],
  marginWidth: ["iframe"],
  mediaGroup: ["audio", "video"]
};
