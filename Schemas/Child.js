const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    child(id: Int): Child
    children(parentId: Int, householdId: Int): [Child]
  }

  type Child {
    id: Int
    firstname: String
    lastname: String
    avatar: ImageSet
    age: Int
    birthday: Birthday
    household: [Household]
    parents: [Parent]
    balance: Int
    favorites: [Product]
    stores: [Store]
  }
`;

const resolvers = {
  Query: {
    children: (root, params, dataSources) => {},
    child: (root, params, dataSources) => {},
  },
  Child: {
    id: (root, params, dataSources) => {},
    firtname: (root, params, dataSources) => {},
    lastname: (root, params, dataSources) => {},
    age: (root, params, dataSources) => {},
    birthday: (root, params, dataSources) => {},
    avatar: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
    parents: (root, params, dataSources) => {},
    balance: (root, params, dataSources) => {},
    favorites: (root, params, dataSources) => {},
    stores: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
