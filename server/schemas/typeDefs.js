const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    latitude: Float
    longitude: Float
    altitude: Float
    friends: [User]
  }

  type Friend {
    _id: ID
    firstName: String
    lastName: String
    email: String
    eqInProximity: [Earthquake]
  }

  type Auth {
    token: ID
    user: User
  }

  input CoordinatesInput {
    latitude: Float
    longitude: Float
    altitude: Float
  }

  type Coordinates {
    latitude: Float
    longitude: Float
    altitude: Float
  }

  type Earthquake {
    ids: String
    title: String
    time: String
    updated: String
    magType: String
    mag: Float
    latitude: Float
    longitutde: Float
    altitude: Float
  }

  type Query {
    user: User
    getFriends: [Friend]
    usersWithoutCurr: [User]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
    updateCoordinates(coordinates: CoordinatesInput): Coordinates
    addFriend(friendId: ID!): User
  }

`;

module.exports = typeDefs;
