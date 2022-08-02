const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type Query {
    item: [Item]
    ingredient: [Ingredient]
    restaurant: [Restaurant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addRestaurantUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    addItem(thoughtText: String!, thoughtAuthor: String!): Thought
    removeItem(thoughtId: ID!): Item
  }
`;

module.exports = typeDefs;
