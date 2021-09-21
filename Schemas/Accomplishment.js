const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    childAccomplishments(
      lookupId: Int!
      lookupType: AccomplishmentLookupType!
      status: ApprovableStatus
    ): [Accomplishment]
    savedAccomplishments(
      lookupId: Int!
      lookupType: AccomplishmentLookupType!
      status: Status
    ): [Accomplishment]
    childAccomplishment(accomplishmentId: Int!): Accomplishment
    savedAccomplishment(accomplishmentId: Int!): Accomplishment
  }

  extend type Mutation {
    createSavedAccomplishment(
      childId: Int!
      householdId: Int!
      title: String!
      avatarId: Int!
      value: Float!
    ): Accomplishment

    createChildAccomplishment(
      childId: Int!
      householdId: Int!
      title: String!
      avatarId: Int!
      value: Float!
    ): Accomplishment

    updateSavedAccomplishment(
      id: Int
      childId: Int
      householdId: Int
      title: String
      avatarId: Int
      value: Float
    ): Accomplishment

    updateChildAccomplishment(
      id: Int!
      childId: Int
      householdId: Int
      title: String
      avatarId: Int
      value: Float
    ): Accomplishment
  }

  type Accomplishment {
    id: Int
    childId: Int
    householdId: Int
    title: String
    description: String
    avatar: ImageSet
    value: Float
    status: Int
  }

  enum AccomplishmentLookupType {
    CHILD_ID
    HOUSEHOLD_ID
    PARENT_ID
  }
`;

const resolvers = {
  Query: {
    children: (root, params, dataSources) => {},
    child: (root, params, dataSources) => {},
  },
  Mutation: {
    createSavedAccomplishment: (root, params, dataSources) => {},
    createChildAccomplishment: (root, params, dataSources) => {},
    updateSavedAccomplishment: (root, params, dataSources) => {},
    updateChildAccomplishment: (root, params, dataSources) => {},
  },
  Accomplishment: {
    id: (root, params, dataSources) => {},
    childId: (root, params, dataSources) => {},
    householdId: (root, params, dataSources) => {},
    title: (root, params, dataSources) => {},
    description: (root, params, dataSources) => {},
    avatar: (root, params, dataSources) => {},
    value: (root, params, dataSources) => {},
    status: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
