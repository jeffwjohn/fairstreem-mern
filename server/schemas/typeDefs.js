const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Subscription {
    userAdded: User!
  }

  type Genre {
    _id: ID
    name: String
  }

  type Song {
    _id: ID!
    title: String!
    artist: String
    description: String
    image: String
    price: Float
    genre: Genre
    tags: [String]
    song_url: String
    s3_object_key: String
    filePath: String!
    likes: Int!
  }

  type Order {
    _id: ID
    purchaseDate: String
    songs: [Song]
  }

  type Checkout {
    session: ID
  }

  type User {
    _id: ID
    avatar: String
    username: String!
    firstName: String
    lastName: String
    password: String!
    email: String
    friends: [User]
    orders: [Order]
  }

  type Artist {
    _id: ID
    avatar: String
    artistName: String!
    email: String
    password: String
    songs: [Song]
    followers: [User]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    artists: [Artist]
    genres: [Genre]
    songs(genre: ID, name: String): [Song]
    song(_id: ID!): Song
    user: User
    users: [User]
    order(_id: ID!): Order
    checkout(songs: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      username: String!
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): Auth
    addOrder(songs: [ID]!): Order
    updateUser(
      username: String
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateSong(
      _id: ID!
      name: String
      description: String
      image: String
      price: Int
      genre: String
      tags: [String]
    ): Song
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = typeDefs;
