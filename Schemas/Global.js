const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Birthday {
    display: String
    month: Int
    day: Int
    year: Int
  }
  type ImageSet {
    small: String
    medium: String
    large: String
  }
  type DateTime {
    epoch: Int
    display: String
  }
`;
const resolvers = {
  ImageSet: {
    small: (root, params, dataSources) => {},
    medium: (root, params, dataSources) => {},
    large: (root, params, dataSources) => {},
  },
  DateTime: {
    epoch: (root, params, dataSources) => {},
    display: (root, params, datasources) => {},
  },
};

module.exports = { typeDefs, resolvers };
