const { typeDefs, resolvers } = require("./Schemas");
module.exports = (config) => [
  typeDefs,
  resolvers,
  require("./DataSources")(config),
];
