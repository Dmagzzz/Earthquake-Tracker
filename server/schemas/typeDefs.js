const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

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

  type Checkout {
    session: ID
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
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
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
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    updateCoordinates(coordinates: CoordinatesInput): Coordinates
    addFriend(friendId: ID!): User
  }

`;

module.exports = typeDefs;
