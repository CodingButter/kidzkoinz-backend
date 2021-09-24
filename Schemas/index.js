const logger = require("../logger");
const fs = require("fs");
const { gql } = require("apollo-server-core");
const GMR = require("graphql-merge-resolvers");

const QueryType = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const typeDefResolvers = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      !fs.statSync(`${__dirname}/${file}`).isDirectory(file) &&
      file !== "index.js"
  )
  .map((file) => {
    const { typeDefs, resolvers } = require(`./${file}`);
    return { typeDefs, resolvers };
  });
const typeDefs = gql(
  [QueryType, ...typeDefResolvers.map(({ typeDefs }) => typeDefs)].join("\n")
);

const resolvers = GMR.merge(typeDefResolvers.map(({ resolvers }) => resolvers));

module.exports = { typeDefs, resolvers };
