const { Schema, model } = require('mongoose');
const {Item, itemSchema} = require('./Item');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    password: {
      type: String,
      required: true,
      max_length: 50,
    },
    item: [itemSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
