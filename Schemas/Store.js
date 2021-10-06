const typeDefs = `
  extend type Query {
    store(id: Int): Store
    stores(lookupId: Int!, lookupType: ProductLookupType!): [Store]
  }

  extend type Mutation {
    createStore(title: String!, avatarId: Int!, householdId: Int!,parentId:Int!): Store
    updateStore(
      id: Int!
      title: String
      avatarId: Int!
      householdId: Int!
      parentId:Int!
      status: Int
    ): Store
  }

  type Store {
    id: Int
    title: String
    avatar: Avatar
    household: Household
    children: [Child]
    parent: Parent
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
    store: (_, { id }, { dataSources }) =>
      dataSources.knexDataSource.getStoreById(id),
  },
  Mutation: {
    createStore: (
      _,
      { title, avatarId, householdId, parentId },
      { dataSources }
    ) =>
      dataSources.knexDataSource.createStore({
        title,
        avatar_id: avatarId,
        household_id: householdId,
        parent_id: parentId,
      }),
    updateStore: (
      _,
      { id, title, avatarId, householdId, parentId, status },
      { dataSources }
    ) =>
      dataSources.knexDataSource.createStore({
        id,
        title,
        avatar_id: avatarId,
        household_id: householdId,
        parent_id: parentId,
        status,
      }),
  },
  Store: {
    id: ({ id }, params, { dataSources }) => id,
    household: ({ household_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdById(household_id),
    parent: ({ parent_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getParentById(parent_id),
    avatar: ({ avatar_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
    children: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getChildrenByStoreId(id),
    products: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getProductsByStoreId(id),
  },
};
module.exports = { typeDefs, resolvers };
