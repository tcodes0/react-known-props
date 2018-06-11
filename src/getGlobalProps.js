const { getReactGlobalProps } = require("./utils/getReactGlobalProps");
const { propsAria } = require("./lists/aria");

module.exports.getGlobalProps = () => [...getReactGlobalProps(), ...propsAria];
