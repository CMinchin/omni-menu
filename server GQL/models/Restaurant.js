const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: 'An item needs a name',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  contact: [
    {
      contact: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
    },
  ],
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item"
    }
  ],
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;