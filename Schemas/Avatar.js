const typeDefs = `
  extend type Query {
    avatar(id: Int!): Avatar
    childAvatars: [Avatar]
    parentAvatars: [Avatar]
    householdAvatars: [Avatar]
    storeAvatars: [Avatar]
    accomplishmentAvatars: [Avatar]
  }

  extend type Mutation {
    createAvatar(title: String!, type: Int!, path: String!): Avatar
  }

  type Avatar {
    id: Int
    title: String
    image: ImageSet
  }
`;

const resolvers = {
  Query: {
    avatar: async (root, { id }, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(id),
    childAvatars: async (root, _, { dataSources }) =>
      dataSources.knexDataSource.getChildAvatars(),
    parentAvatars: async (root, _, { dataSources }) =>
      dataSources.knexDataSource.getParentAvatars(),
    householdAvatars: async (root, _, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdAvatars(),
    storeAvatars: async (root, _, { dataSources }) =>
      dataSources.knexDataSource.getStoreAvatars(),
    accomplishmentAvatars: async (root, _, { dataSources }) =>
      dataSources.knexDataSource.getAccomplishmentAvatars(),
  },
  Avatar: {
    id: ({ id }) => id,
    title: ({ title }) => title,
    image: ({ image }) => image,
  },
};

module.exports = { typeDefs, resolvers };
