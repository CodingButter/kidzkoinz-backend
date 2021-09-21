const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    households(lookupId: Int!, lookupType: HouseholdLookupType!): [Household]
    household(id: Int): Household
  }

  extend type Mutation {
    createHousehold(parent_id: Int, title: String): Household
    updateHousehold(status: Status, title: String): Household
  }

  type Household {
    id: Int
    name: String
    parents: [Parent]
    children: [Child]
    stores: [Store]
  }

  enum HouseholdLookupType {
    PARENT_ID
    CHILD_ID
    STORE_ID
  }
`;

const resolvers = {
  Query: {
    households: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
  },
  Mutation: {
    createHouseholds: (root, params, dataSources) => {},
    updateHouseholds: (root, params, dataSources) => {},
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
