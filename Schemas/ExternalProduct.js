const typeDefs = `
  extend type Query {
    externalProducts(keyword: String, page: Int, itemLimit: Int,category: String,country: String): [ExternalProduct]
    externalProduct(externalId: String!): ExternalProduct
  }

  type ExternalProduct {
    title: String
    description: String
    externalId: String
    prime: Boolean
    images:[ImageSet]
    videos:[Video]
    thumbnail: String
    price: Float
    url: String
    available: Boolean
  }
`;

const resolvers = {
  Query: {
    externalProducts: async (
      root,
      { keyword, category, country, page, itemLimit },
      { dataSources }
    ) =>
      await dataSources.productSource.searchProducts({
        keyword,
        category,
        country,
        page,
        itemLimit,
      }),
    externalProduct: async (root, { externalId }, { dataSources }) =>
      await dataSources.productSource.getProductByExternalId(externalId),
  },
  ExternalProduct: {
    externalId: ({ externalId }) => externalId,
    title: ({ title }) => title,
    price: ({ price }) => price,
    prime: ({ prime }) => prime,
    url: ({ url }) => url,
    thumbnail: ({ thumbnail }) => thumbnail,
    available: async ({ externalId, available }, _, { dataSources }) => {
      if (available !== undefined) return available;
      const response = await dataSources.productSource.getProductByExternalId(
        externalId
      );
      return response.available;
    },
    description: async ({ description, externalId }, _, { dataSources }) => {
      if (description) return description;
      const response = await dataSources.productSource.getProductByExternalId(
        externalId
      );
      return response.description;
    },
    images: async ({ images, externalId }, _, { dataSources }) => {
      if (images) return images;
      const response = await dataSources.productSource.getProductByExternalId(
        externalId
      );
      return response.images;
    },
    videos: async ({ videos, externalId }, _, { dataSources }) => {
      if (videos) return videos;
      const response = await dataSources.productSource.getProductByExternalId(
        externalId
      );
      return response.videos;
    },
  },
};
module.exports = { typeDefs, resolvers };
