const typeDefs = `
  extend type Query {
    child(id: Int!): Child
    children(lookupId: Int!, lookupType: ChildLookupType!): [Child]
  }

  extend type Mutation {
    createChild(
      firstname: String!
      lastname: String!
      avatarId: Int!
      householdId: Int!
      birthday: String!
      password: String!
      balance: Float
    ): Child

    updateChild(
      id: Int!
      firstname: String
      lastname: String
      avatarId: Int
      birthday: String
      password: String
      balance: Float
      status: Int
    ): Child
  }

  type Child {
    id: Int
    firstname: String
    lastname: String
    avatar: Avatar
    age: Int
    "Birthday is in yyyy-mm-dd format"
    birthday: String
    households: [Household]
    parents: [Parent]
    balance: Int
    favorites: [Product]
    purchases: [Purchase]
    stores: [Store]
    accomplishments: [Accomplishment]
    status: Int
  }

  enum ChildLookupType {
    PARENT_ID
    HOUSEHOLD_ID
    STORE_ID
  }
`;

const resolvers = {
  Query: {
    children: (_, { lookupId, lookupType }, { dataSources }) => {
      switch (lookupType) {
        case "STORE_ID":
          return dataSources.knexDataSource.getChildrenByStoreId(lookupId);
        case "HOUSEHOLD_ID":
          return dataSources.knexDataSource.getChildrenByHouseholdId(lookupId);
        case "PARENT_ID":
          return dataSources.knexDataSource.getChildrenByParentId(lookupId);
        default:
      }
    },
    child: async (root, { id }, { dataSources }) =>
      dataSources.knexDataSource.getChildById(id),
  },
  Mutation: {
    createChild: (
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
      dataSources.knexDataSource.createChild({
        first_name: firstname,
        last_name: lastname,
        avatar_id: avatarId,
        birthday,
        password,
        balance,
        household_id: householdId,
      }),
    updateChild: (
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
        status,
      },
      { dataSources }
    ) =>
      dataSources.knexDataSource.updateChild({
        id,
        first_name: firstname,
        last_name: lastname,
        avatar_id: avatarId,
        birthday,
        password,
        balance,
        household_id: householdId,
        status,
      }),
  },
  Child: {
    id: ({ id }) => id,
    balance: ({ balance }) => balance,
    birthday: ({ birthday }) => birthday,
    firstname: ({ first_name }) => first_name,
    lastname: ({ last_name }) => last_name,
    status: ({ status }) => status,
    age: ({ birthday }, _, { dataSources }) =>
      dataSources.knexDataSource.getAgeFromBirthday(birthday),
    avatar: ({ avatar_id }, _, { dataSources }) =>
      dataSources.knexDataSource.getAvatarById(avatar_id),
    households: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getHouseholdsByChildId(id),
    parents: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getParentsByChildId(id),
    favorites: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getFavoritesByChildId(id),
    stores: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getStoresByChildId(id),
    accomplishments: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getChildAccomplishmentsByChildId(id),
    purchases: ({ id }, _, { dataSources }) =>
      dataSources.knexDataSource.getPurchasesByChildId(id),
  },
};

module.exports = { typeDefs, resolvers };
