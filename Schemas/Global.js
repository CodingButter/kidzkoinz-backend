const { gql } = require("apollo-server-express");
const typeDefs = gql`
  enum ApprovableStatus {
    ACTIVE
    PENDING
    APPROVED
    INACTIVE
  }
  enum Status {
    ACTIVE
    INACTIVE
  }
  type ImageSet {
    small: String
    medium: String
    large: String
  }
`;
const resolvers = {
  ImageSet: {
    small: (root, params, dataSources) => {},
    medium: (root, params, dataSources) => {},
    large: (root, params, dataSources) => {},
  },
};

module.exports = { typeDefs, resolvers };
