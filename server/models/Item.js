const { Schema, model } = require('mongoose');
const { Tag, tagSchema } = require('./Tag');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    restaurant: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tag: [tagSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Item = model('item', itemSchema);

module.exports = {Item, itemSchema};
