const logger = require("../logger");
const fs = require("fs");
const { gql } = require("apollo-server-core");
const { buildFederatedSchema } = require("@apollo/federation");
const QueryType = gql`
  type Query {
    _empty: String
  }
`;
const QueryResolver = {};
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

const typeDefs = [
  QueryType,
  ...typeDefResolvers.map(({ typeDefs }) => typeDefs),
];
const resolvers = [
  QueryResolver,
  ...typeDefResolvers.map(({ resolvers }) => resolvers),
];
module.exports = buildFederatedSchema({ typeDefs, resolvers });
