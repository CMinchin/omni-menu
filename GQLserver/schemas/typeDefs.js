const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    password: String
    restaurants: [Restaurant]!
  }

  type Item {
    _id: ID!
    name: String
    desc: String
    rest: Restaurant
    ingredients: [Ingredient]!
  }

  type Ingredient {
    _id: ID!
    name: String
  }

  type Restaurant {
    _id: ID!
    name: String!
    dishes: [Item]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    item: [Item]
    ingredient: [Ingredient]
    restaurant: [Restaurant]
    me: [Restaurant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addRestaurantUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    addItem(name: String!, description: String!, ingredients: [String]!): Item
    removeItem(itemId: ID!): Item
  }
`;

module.exports = typeDefs;
