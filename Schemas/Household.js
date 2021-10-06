const typeDefs = `
  extend type Query {
    households(lookupId: Int!, lookupType: HouseholdLookupType!): [Household]
    household(id: Int!): Household
  }

  extend type Mutation {
    createHousehold(parentId: Int!, title: String!,avatarId: Int,building: String,number: Int,street: String,district: String,city: String,postalCode: String): Household
    updateHousehold(status: Int, title: String,avatarId: Int,building: String,number: Int,street: String,district: String,city: String,postalcode: String): Household
  }

  type Household {
    id: Int
    title: String
    avatar: Avatar
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
    households: async (root, { lookupId, lookupType }, { dataSources }) => {
      switch (lookupType) {
        case "STORE_ID":
          return await dataSources.knexDataSource.getHouseholdsByStoreId(
            lookupId
          );
        case "CHILD_ID":
          return await dataSources.knexDataSource.getHouseholdsByChildId(
            lookupId
          );
        case "PARENT_ID":
          return await dataSources.knexDataSource.getHouseholdsByParentId(
            lookupId
          );
        default:
      }
    },
    household: (root, { id }, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdById(id),
  },
  Mutation: {
    createHousehold: (
      root,
      {
        parentId,
        title,
        avatarId,
        building,
        number,
        street,
        district,
        city,
        postalcode,
      },
      { dataSources }
    ) =>
      dataSources.knexDataSource.createHousehold({
        parent_id: parentId,
        title,
        avatar_id: avatarId,
        building,
        number,
        street,
        district,
        city,
        postalcode,
      }),
    updateHousehold: (
      root,
      {
        id,
        title,
        avatarId,
        building,
        number,
        street,
        district,
        city,
        postalcode,
        status,
      },
      { dataSources }
    ) =>
      dataSources.knexDataSource.updateHousehold({
        id,
        parent_id: parentId,
        title,
        avatar_id: avatarId,
        building,
        number,
        street,
        district,
        city,
        postalcode,
        status,
      }),
  },
  Household: {
    id: ({ id }) => id,
    title: ({ title }) => title,
    avatar: ({ avatar_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
    parents: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getParentsByHouseholdId(id),
    children: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getChildrenByHouseholdId(id),
    stores: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getStoresByHouseholdId(id),
  },
};

module.exports = { typeDefs, resolvers };
