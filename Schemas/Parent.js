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
      birthday: String!
      email: String!
      password: String!
    ): Parent

    updateParent(
      firstname: String!
      lastname: String!
      avatarId: Int
      email: String
      password: String
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
    "Birthday is in yyyy-mm-dd format"
    birthday: String
    households: [Household]
    children: [Child]
    balance: Float
    stores: [Store]
    dashboard: String
    status: Int
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
    createParent: (
      root,
      {
        firstname,
        lastname,
        avatarId,
        birthday,
        password,
        balance,
        householdId,
      },
      { dataSources }
    ) =>
      dataSources.knexDataSource.createParent({
        first_name: firstname,
        last_name: lastname,
        avatar_id: avatarId,
        birthday,
        password,
        balance,
        household_id: householdId,
      }),
    updateParent: (
      root,
      {
        id,
        firstname,
        lastname,
        avatarId,
        birthday,
        password,
        balance,
        householdId,
        dashboard,
      },
      { dataSources }
    ) =>
      dataSources.knexDataSource.updateParent({
        id,
        first_name: firstname,
        last_name: lastname,
        avatar_id: avatarId,
        birthday,
        password,
        balance,
        dashboard,
        household_id: householdId,
      }),
  },
  Parent: {
    id: ({ id }) => id,
    balance: ({ balance }) => balance,
    birthday: ({ birthday }) => birthday,
    firstname: ({ first_name }) => first_name,
    lastname: ({ last_name }) => last_name,
    dashboard: ({ dashboard }) => dashboard,
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
