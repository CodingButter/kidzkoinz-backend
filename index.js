const logger = require("./logger");
const { ApolloServer } = require("apollo-server");
const configs = require("./config.js");
const [schema, dataSources] = require("./initialize")(configs);

const server = new ApolloServer({
  schema,
  dataSources,
  introspection: process.env.NODE_ENV !== "production",
});

// The `listen` method launches a web server.
server.listen().then((resp) => {
  logger.info(`🚀  Server ready at ${resp.url}`);
});
