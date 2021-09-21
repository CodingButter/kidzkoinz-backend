const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    child(id: Int!): Child
    children(lookupId: Int!, lookupType: ChildLookupType!): [Child]
  }

  extend type Mutation {
    createChild(
      firtname: String!
      lastname: String!
      avatarId: Int!
      birthday: String!
      password: String!
      balance: Float
    ): Child

    updateChild(
      childId: Int!
      firtname: String
      lastname: String
      avatarId: Int
      birthday: String
      password: String
      balance: Float
      status: Status
    ): Child
  }

  type Child {
    id: Int
    firstname: String
    lastname: String
    avatar: ImageSet
    age: Int
    birthday: String
    household: [Household]
    parents: [Parent]
    balance: Int
    favorites: [Product]
    purchases: [Purchase]
    stores: [Store]
    accomplishments: [Accomplishment]
  }

  enum ChildLookupType {
    PARENT_ID
    HOUSEHOLD_ID
    STORE_ID
  }
`;

const resolvers = {
  Query: {
    children: (root, params, dataSources) => {},
    child: (root, params, dataSources) => {},
  },
  Mutation: {
    createChild: (root, params, dataSources) => {},
    updateChild: (root, params, dataSources) => {},
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
    accomplishments: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
