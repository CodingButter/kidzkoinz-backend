const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    household(id: Int): Household
    households(childId: Int, parentId: Int, storeId: Int): [Household]
  }
  type Household {
    id: Int
    name: String
    parents: [Parent]
    children: [Child]
    stores: [Store]
  }
`;

const resolvers = {
  Query: {
    households: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
  },
  Household: {
    id: (root, params, dataSources) => {},
    name: (root, params, dataSources) => {},
    parents: (root, params, dataSources) => {},
    children: (root, params, dataSources) => {},
    stores: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
