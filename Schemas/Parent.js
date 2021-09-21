const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    parents(lookupId: Int!, lookupType: ParentLookupType!): [Parent]
    parent(id: Int): Parent
  }

  extend type Mutation {
    createParent(
      firstname: String!
      lastname: String!
      avatarId: Int
      birthday: String
    ): Parent
    updateParent(
      firstname: String!
      lastname: String!
      avatarId: Int
      birthday: String
      status: Status
    ): Parent
  }

  type Parent {
    id: Int
    firtname: String
    lastname: String
    avatar: ImageSet
    age: Int
    birthday: String
    household: [Household]
    children: [Child]
    balance: Float
    stores: [Store]
  }

  enum ParentLookupType {
    CHILD_ID
    HOUSEHOLD_ID
    STORE_ID
  }
`;

const resolvers = {
  Query: {
    parents: (root, params, dataSources) => {},
    parent: (root, params, dataSources) => {},
  },
  Mutation: {
    createParents: (root, params, dataSources) => {},
    updateParents: (root, params, dataSources) => {},
  },
  Parent: {
    id: (root, params, dataSources) => {},
    firstname: (root, params, dataSources) => {},
    lastname: (root, params, dataSources) => {},
    birthday: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
    children: (root, params, dataSources) => {},
    balance: (root, params, dataSources) => {},
    stores: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
