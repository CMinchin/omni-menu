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
`
`
  type Mutation {
    addIngredient(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
