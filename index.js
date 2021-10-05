const logger = require("./logger");
require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const configs = require("./config.js");

const [typeDefs, resolvers, dataSources] = require("./initialize")(configs);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: process.env.NODE_ENV !== "production",
});

if (process.env.NODE_ENV === "development") {
  const express = require("express");
  const app = express();
  const staticPort = process.env.STATIC_PORT;
  app.use("/images", express.static(`${__dirname}/bin/images`));

  app.listen(staticPort, () => {
    console.log(`Images Served at http://localhost:${staticPort}`);
  });
}
// The `listen` method launches a web server.
server.listen().then((resp) => {
  logger.info(`🚀  Server ready at ${resp.url}`);
});
