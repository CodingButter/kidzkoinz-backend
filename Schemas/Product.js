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
    name: String
    description: String
    images: [ImageSet]
    price: Float
    status: Int
    store: Store
    favorites: [Child]
    purchases: [Child]
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
    products: (root, params, dataSources) => {},
    product: (root, params, dataSources) => {},
  },
  Mutation: {
    createProduct: (root, params, dataSources) => {},
    updateProduct: (root, params, dataSources) => {},
  },
  Product: {
    id: (root, params, dataSources) => {},
    name: (root, params, dataSources) => {},
    description: (root, params, dataSources) => {},
    images: (root, params, dataSources) => {},
    price: (root, params, dataSources) => {},
    purchases: (root, params, dataSources) => {},
    favorites: (root, params, dataSources) => {},
    store: (root, params, dataSources) => {},
  },
};
module.exports = { typeDefs, resolvers };
