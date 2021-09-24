const typeDefs = `

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

const resolvers = {};

module.exports = { typeDefs, resolvers };
