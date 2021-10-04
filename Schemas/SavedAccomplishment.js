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
    savedAccomplishments: (
      _,
      { lookupId, status, lookupType },
      { dataSources }
    ) => {
      switch (lookupType) {
        case "CHILD_ID":
          return dataSources.knexDataSource.getSavedAccomplishmentsByChildId(
            lookupId
          );
        case "HOUSEHOLD_ID":
          return dataSources.knexDataSource.getSavedAccomplishmentsByHouseholdId(
            lookupId
          );
        case "PARENT_ID":
          return dataSources.knexDataSource.getSavedAccomplishmentsByParentId(
            lookupId
          );
        default:
      }
    },

    childAccomplishments: (
      _,
      { lookupId, status, lookupType },
      { dataSources }
    ) => {
      switch (lookupType) {
        case "CHILD_ID":
          return dataSources.knexDataSource.getChildAccomplishmentsByChildId(
            lookupId
          );
        case "HOUSEHOLD_ID":
          return dataSources.knexDataSource.getChildAccomplishmentsByHouseholdId(
            lookupId
          );
        case "PARENT_ID":
          return dataSources.knexDataSource.getChildAccomplishmentsByParentId(
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
    value: ({ value }) => value,
    status: ({ status }) => status,
    title: ({ title }) => title,
    child: ({ child_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getChildById(child_id),
    household: ({ household_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdById(household_id),
    parent: ({ parent_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getParentById(parent_id),
    description: ({ description }) => description,
    avatar: ({ avatar_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
  },
};
module.exports = { typeDefs, resolvers };
