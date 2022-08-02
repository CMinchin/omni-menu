const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
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
  ingredients: [
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
    },
  ],
});

const Item = model('Item', itemSchema);

module.exports = Item;