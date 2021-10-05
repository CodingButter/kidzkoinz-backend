const typeDefs = `
  extend type Query {
    parents(lookupId: Int!, lookupType: ParentLookupType!): [Parent]
    parent(id: Int): Parent
  }

  extend type Mutation {
    createParent(
      firstname: String!
      lastname: String!
      avatarId: Int
      birthday: String
    ): Parent

    updateParent(
      firstname: String!
      lastname: String!
      avatarId: Int
      birthday: String
      status: Int
    ): Parent
  }

  type Parent {
    id: Int
    firstname: String
    lastname: String
    avatar: Avatar
    age: Int
    birthday: String
    households: [Household]
    children: [Child]
    balance: Float
    stores: [Store]
  }

  enum ParentLookupType {
    CHILD_ID
    HOUSEHOLD_ID
    STORE_ID
  }
`;

const resolvers = {
  Query: {
    parents: (root, params, dataSources) => {},
    parent: (root, { id }, { dataSources }) =>
      dataSources.knexDataSource.getParentById(id),
  },
  Mutation: {
    createParent: (root, params, dataSources) => {},
    updateParent: (root, params, dataSources) => {},
  },
  Parent: {
    id: ({ id }) => id,
    balance: ({ balance }) => balance,
    birthday: ({ birthday }) => birthday,
    firstname: ({ first_name }) => first_name,
    lastname: ({ last_name }) => last_name,
    age: ({ birthday }, _, { dataSources }) =>
      dataSources.knexDataSource.getAgeFromBirthday(birthday),
    avatar: ({ avatar_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
    households: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdsByParentId(id),
    children: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getChildrenByParentId(id),
    stores: ({ id }, params, { dataSources }) =>
      dataSources.knexDataSource.getStoresByParentId(id),
  },
};

module.exports = { typeDefs, resolvers };
