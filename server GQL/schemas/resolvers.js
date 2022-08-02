const { Item, User, Restaurant } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    item: async () => {
      return Item.find();
    },
    restaurant: async (parent, { restaurantId }) => {
      return Restaurant.findOne({ _id: restaurantId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('restaurant');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addRestaurantUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      const restaurant = await Restaurant.create({
        thoughtText,
        thoughtAuthor: user.username,
      });
      
      await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { restaurant: restaurant._id } }
      );
      
      return { token, user, restaurant };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addItem: async (parent, { restaurantId, item }) => {
      if (User.findOne(context.user._id).restaurant.includes(restaurantId)) {
        throw new AuthenticationError('This is not your restaurant');
      }

      return Restaurant.findOneAndUpdate(
        { _id: restaurantId },
        {
          $addToSet: { items: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
