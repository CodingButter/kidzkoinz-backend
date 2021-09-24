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
    stores: (root, params, dataSources) => {},
    store: (root, params, dataSources) => {},
  },
  Store: {
    id: (root, params, dataSources) => {},
    household: (root, params, dataSources) => {},
    avatar: (root, params, dataSources) => {},
    children: (root, params, dataSources) => {},
    products: (root, params, dataSources) => {},
  },
};
module.exports = { typeDefs, resolvers };
