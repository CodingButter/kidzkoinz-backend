const buildDevLogger = require("./dev-logger");
const buildProdLogger = require("./prod-logger");
switch (process.env.NODE_ENV) {
  case "development":
    module.exports = buildDevLogger();
    break;
  default:
    module.exports = buildProdLogger();
}
