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

  type Video{
    title: String
    thumbnail: String
    url:String
    videoWidth: Int
    videoHeight: Int
  }
`;

const resolvers = {};

module.exports = { typeDefs, resolvers };
