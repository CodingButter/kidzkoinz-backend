const { data } = require("../logger");

const typeDefs = `
  extend type Query {
    favorites(childId: Int!): [Favorite]
  }

  extend type Mutation {
    createFavorite(childId: Int!, productId: Int!, Price: Float!): Favorite
    updateFavorite(status: ApprovableStatus!): Favorite
  }

  type Favorite {
    child: Child
    product: Product
    price: Int
    time: String
    store: Store
    status: ApprovableStatus
  }

`;

const resolvers = {
  Query: {
    favorites: (root, params, dataSources) => {},
  },
  Mutation: {
    createFavorite: (root, params, dataSources) => {},
    updateFavorite: (root, params, dataSources) => {},
  },
  Favorite: {
    child: ({ child_id }, params, dataSources) =>
      dataSources.knexDataSource.getChildById(child_id),
    product: ({ product_id }, params, dataSources) =>
      dataSources.knexDataSource.getProductById(product_id),
    time: ({ created_at }, params, dataSources) => created_at,
  },
};
module.exports = { typeDefs, resolvers };
