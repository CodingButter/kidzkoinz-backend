const typeDefs = `
  extend type Query {
    purchases(lookupId: Int!, lookupType: PurchaseLookupType!): [Purchase]
  }

  extend type Mutation {
    createPurchase(childId: Int!, productId: Int!, Price: Float!): Purchase
    updatePurchase(status: ApprovableStatus!): Purchase
  }

  type Purchase {
    child: Child
    product: Product
    price: Int
    time: String
    store: Store
    household: Household
    status: ApprovableStatus
  }

  enum PurchaseLookupType {
    PARENT_ID
    CHILD_ID
    HOUSEHOLD_ID
    STORE_ID
  }
`;

const resolvers = {
  Query: {
    purchases: (root, params, dataSources) => {},
  },
  Mutation: {
    createPurchase: (root, params, dataSources) => {},
    updatePurchase: (root, params, dataSources) => {},
  },
  Purchase: {
    child: (root, params, dataSources) => {},
    product: (root, params, dataSources) => {},
    price: (root, params, dataSources) => {},
    time: (root, params, dataSources) => {},
  },
};
module.exports = { typeDefs, resolvers };
