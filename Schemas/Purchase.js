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
    purchases: (root, { childId }, { dataSources }) =>
      dataSources.knexDataSource.getPurchasesbyChildId(childId),
  },
  Mutation: {
    createPurchase: (root, params, { dataSources }) => {},
    updatePurchase: (root, params, { dataSources }) => {},
  },
  Purchase: {
    child: ({ child_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getChildById(child_id),
    product: ({ product_id }, params, { dataSources }) =>
      dataSources.knexDataSource.getProductById(product_id),
    price: ({ price }) => price,
    time: ({ created_at }) => created_at,
  },
};
module.exports = { typeDefs, resolvers };
