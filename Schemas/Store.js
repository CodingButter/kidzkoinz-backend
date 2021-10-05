const typeDefs = `
  extend type Query {
    store(id: Int): Store
    stores(lookupId: Int!, lookupType: ProductLookupType!): [Store]
  }

  extend type Mutation {
    createStore(title: String!, avatarId: Int!, householdId: Int!): Store
    updateStore(
      title: String
      avatarId: Int!
      householdId: Int!
      status: Int
    ): Store
  }

  type Store {
    id: Int
    title: String
    avatar: Avatar
    household: Household
    children: [Child]
    parent: [Parent]
    products: [Product]
    purchases: [Purchase]
  }

  enum StoreLookupType {
    PARENT_ID
    HOUSEHOLD_ID
    CHILD_ID
    PRODUCT_ID
  }
`;

const resolvers = {
  Query: {
    stores: (_, { lookupId, lookupType }, { dataSources }) => {},
    store: (_, { id }, { dataSources }) => dataSources.getStoreById(id),
  },
  Store: {
    id: ({ id }, params, { dataSources }) => id,
    household: ({ household_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdById(household_id),
    avatar: ({ avatar_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
    children: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getChildrenByStoreId(id),
    products: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getProductsByStoreId(id),
  },
};
module.exports = { typeDefs, resolvers };
