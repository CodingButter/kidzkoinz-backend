const typeDefs = `
  extend type Query {
    products(lookupId: Int!, lookupType: ProductLookupType!): [Product]
    product(id: Int!): Product
  }

  extend type Mutation {
    createProduct(name: String!, description: String!, price: Float!): Product
    updateProduct(name: String, description: String, price: Float): Product
  }

  type Product {
    id: Int
    title: String
    description: String
    externalId:String
    localImages: [ImageSet]
    remoteImages:[ImageSet]
    videos:[Video]
    price: Float
    status: Int
    store: Store
  }

  enum ProductLookupType {
    PARENT_ID
    HOUSEHOLD_ID
    STORE_ID
    CHILD_ID
  }
`;

const resolvers = {
  Query: {
    products: async (root, { storeId }, { dataSources }) =>
      await dataSources.knexDataSource.getProductsByStoreId(storeId),
    product: async (root, { id }, { dataSources }) =>
      await dataSources.knexDataSource.getProductById(id),
  },
  Mutation: {
    createProduct: (root, params, dataSources) => {},
    updateProduct: (root, params, dataSources) => {},
  },
  Product: {
    id: ({ id }) => id,
    title: ({ title }) => title,
    description: ({ description }) => description,
    price: ({ price }) => price,
    externalId: ({ external_id }) => external_id,
    localImages: async ({ external_id }, _, { dataSources }) =>
      await dataSources.knexDataSource.getLocalImagesByExternalProductId(
        external_id
      ),
    remoteImages: async (
      { external_source_id, external_id },
      _,
      { dataSources }
    ) =>
      await dataSources.knexDataSource.getRemoteImagesByExternalProductId(
        external_source_id,
        external_id
      ),
    store: async ({ store_id }, _, { dataSources }) =>
      await dataSources.knexDataSource.getStoreById(store_id),
  },
};
module.exports = { typeDefs, resolvers };
