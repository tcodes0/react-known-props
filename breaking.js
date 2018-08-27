const rkp = require("./src");
const fs = require("fs");

fs.writeFileSync("./getAllProps", `${JSON.stringify(rkp.getAllProps(), 0, 2)}`);

fs.writeFileSync(
  "./getGlobalProps",
  `${JSON.stringify(rkp.getGlobalProps(), 0, 2)}`
);

fs.writeFileSync(
  "./getEventProps",
  `${JSON.stringify(rkp.getEventProps(), 0, 2)}`
);

fs.writeFileSync(
  "./getElementPropsCircle",
  `${JSON.stringify(rkp.getElementProps("circle"), 0, 2)}`
);

fs.writeFileSync(
  "./getElementPropsTable",
  `${JSON.stringify(rkp.getElementProps("table"), 0, 2)}`
);
