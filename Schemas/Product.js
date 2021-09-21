const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    products(
      childId: Int
      parentId: Int
      householdId: Int
      productId: Int
      storeId: Int
    ): [Product]
    product(id: Int): Product
  }
  type Product {
    id: Int
    name: String
    description: String
    images: [ImageSet]
    price: Int
  }
`;

const resolvers = {
  Query: {
    products: (root, params, dataSources) => {},
    product: (root, params, dataSources) => {},
  },
  Product: {
    id: (root, params, dataSources) => {},
    name: (root, params, dataSources) => {},
    description: (root, params, dataSources) => {},
    images: (root, params, dataSources) => {},
    price: (root, params, dataSources) => {},
  },
};
module.exports = { typeDefs, resolvers };
