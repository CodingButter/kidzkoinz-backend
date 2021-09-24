const typeDefs = `
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
      status: Int
    ): Child
  }

  type Child {
    id: Int
    firstname: String
    lastname: String
    avatar: Avatar
    age: Int
    birthday: String
    households: [Household]
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
    children: async (_, { lookupId, lookupType }, { dataSources }) => {
      switch (lookupType) {
        case "STORE_ID":
          return await dataSources.knexDataSource.getChildrenByStoreId(
            lookupId
          );
        case "HOUSEHOLD_ID":
          return await dataSources.knexDataSource.getChildrenByHouseholdId(
            lookupId
          );
        case "PARENT_ID":
          return await dataSources.knexDataSource.getChildrenByParentId(
            lookupId
          );
        default:
      }
    },
    child: async (root, { id }, { dataSources }) => {
      return await dataSources.knexDataSource.getChildById(id);
    },
  },
  Mutation: {
    createChild: (root, params, { dataSources }) => {},
    updateChild: (root, params, { dataSources }) => {},
  },
  Child: {
    id: ({ id }) => id,
    balance: ({ balance }, _, { dataSources }) => balance,
    birthday: ({ birthday }) => birthday,
    firstname: ({ first_name }) => first_name,
    lastname: ({ last_name }) => last_name,
    age: ({ birthday }, _, { dataSources }) =>
      dataSources.knexDataSource.getAgeFromBirthday(birthday),
    avatar: ({ avatar_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
    households: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdByChildId(id),
    parents: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getParentsByChildId(id),
    favorites: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getFavoritesByChildId(id),
    stores: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getStoresByChildId(id),
    accomplishments: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getChildAccomplishmentsByChildId(id),
  },
};

module.exports = { typeDefs, resolvers };
