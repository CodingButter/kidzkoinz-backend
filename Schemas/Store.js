const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    store(id: Int): Store
    stores(childId: Int, parentId: Int, household: Int, productid: Int): [Store]
  }

  type Store {
    id: Int
    household: Household
    children: [Child]
    parent: [Parent]
    products: [Product]
  }
`;
const resolvers = {
  Query: {
    stores: (root, params, dataSources) => {},
    store: (root, params, dataSources) => {},
  },
  Store: {
    id: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
    children: (root, params, dataSources) => {},
    products: (root, params, dataSources) => {},
  },
};
module.exports = { typeDefs, resolvers };
