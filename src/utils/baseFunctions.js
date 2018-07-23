module.exports.existy = x => x != null;
module.exports.truthy = x => x !== false && module.exports.existy(x);
module.exports.isObj = o => typeof o === "object";
