const typeDefs = `
  extend type Query {
    childAccomplishments(
      lookupId: Int!
      lookupType: AccomplishmentLookupType!
      status: Int
    ): [Accomplishment]

    savedAccomplishments(
      lookupId: Int!
      lookupType: AccomplishmentLookupType!
      status: Int
    ): [Accomplishment]
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
      id: Int!
      childId: Int
      title: String
      avatarId: Int
      value: Float
      status: Int
    ): Accomplishment

    updateChildAccomplishment(
      id: Int!
      childId: Int
      householdId: Int
      title: String
      avatarId: Int
      value: Float
      status: Int
    ): Accomplishment
  }

  type Accomplishment {
    id: Int
    child: Child
    household: Household
    parent: Parent
    title: String
    description: String
    avatar: Avatar
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
    savedAccomplishments: async (
      _,
      { lookupId, status, lookupType },
      { dataSources }
    ) => {
      switch (lookupType) {
        case "CHILD_ID":
          return await dataSources.knexDataSource.getSavedAccomplishmentsByChildId(
            lookupId
          );
        case "HOUSEHOLD_ID":
          return await dataSources.knexDataSource.getSavedAccomplishmentsByHouseholdId(
            lookupId
          );
        case "PARENT_ID":
          return await dataSources.knexDataSource.getSavedAccomplishmentsByParentId(
            lookupId
          );
        default:
      }
    },

    childAccomplishments: async (
      _,
      { lookupId, status, lookupType },
      { dataSources }
    ) => {
      switch (lookupType) {
        case "CHILD_ID":
          return await dataSources.knexDataSource.getChildAccomplishmentsByChildId(
            lookupId
          );
        case "HOUSEHOLD_ID":
          return await dataSources.knexDataSource.getChildAccomplishmentsByHouseholdId(
            lookupId
          );
        case "PARENT_ID":
          return await dataSources.knexDataSource.getChildAccomplishmentsByParentId(
            lookupId
          );
        default:
      }
    },
  },
  Mutation: {
    createSavedAccomplishment: (root, params, dataSources) => {},
    createChildAccomplishment: (root, params, dataSources) => {},
    updateSavedAccomplishment: (root, params, dataSources) => {},
    updateChildAccomplishment: (root, params, dataSources) => {},
  },
  Accomplishment: {
    id: ({ id }) => id,
    child: ({ child_id }, _, { dataSources }) => {},
    household: ({ child_id }, _, { dataSources }) => {},
    parent: ({ parent_id }, _, { dataSources }) => {},
    title: ({ title }) => title,
    description: ({ description }) => description,
    avatar: ({ avatar_id }, _, { dataSources }) => {},
    value: ({ value }) => value,
    status: ({ status }) => status,
  },
};
module.exports = { typeDefs, resolvers };
