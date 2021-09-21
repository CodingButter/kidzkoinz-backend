const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    parents(childId: Int, householdId: Int, storeId: Int): [Parent]
    parent(id: Int): Parent
  }
  type Parent {
    id: Int
    firtname: String
    lastname: String
    avatar: ImageSet
    age: Int
    birthday: Birthday
    household: [Household]
    children: [Child]
    balance: Float
    stores: [Store]
  }
`;

const resolvers = {
  Query: {
    parents: (root, params, dataSources) => {},
    parent: (root, params, dataSources) => {},
  },
  Parent: {
    id: (root, params, dataSources) => {},
    firstname: (root, params, dataSources) => {},
    lastname: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
    children: (root, params, dataSources) => {},
    balance: (root, params, dataSources) => {},
    stores: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
