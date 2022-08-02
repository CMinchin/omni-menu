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
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        user = await User.findOne({ username });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials'); // login via email OR username
        }
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials'); // obscure whether the user typed username or password incorrectly for security reasons
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
    removeItem: async (parent, { itemId, restaurantId }) => {
      if (context.user) {
        if (User.findOne(context.user._id).restaurant.includes(restaurantId)) {
          throw new AuthenticationError('This is not your restaurant');
        }
        const item = await Item.findOneAndDelete({
          _id: itemId,
          restaurantId
        });

        await Restaurant.findOneAndUpdate(
          { _id: restaurantId },
          { $pull: { items: item._id } }
        );

        return item;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
