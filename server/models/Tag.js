const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
  {
    name: {
      type: String,
      default: () => new Types.ObjectId(),
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Tag = model("tag", tagSchema);

module.exports = {Tag, tagSchema};
