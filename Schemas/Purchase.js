const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    purchases(childId: Int): [Purchase]
  }
  type Purchase {
    child: Child
    product: Product
    purchase_price: Int
    time: DateTime
  }
`;

const resolvers = {
  Query: {
    purchases: (root, params, dataSources) => {},
  },
  Purchase: {
    child: (root, params, dataSources) => {},
    product: (root, params, dataSources) => {},
    purchase_price: (root, params, dataSources) => {},
    time: (root, params, dataSources) => {},
  },
};
module.exports = { typeDefs, resolvers };
