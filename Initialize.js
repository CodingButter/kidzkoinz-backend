module.exports = (config) => [
  require("./Schemas"),
  require("./DataSources")(config),
];
