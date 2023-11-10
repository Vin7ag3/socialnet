const { Schema, Types } = require('mongoose');

// define reactions
const reactionSchema = new Schema(
  {
// reaction identifier
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
// content of the reaction limited to 280 chara
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
// user associated with reaction
    username: {
      type: String,
      required: true,
    },
// time for when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
// getters for serialization
    toJSON: {
      getters: true,
    },
// exclude id
    id: false,
  }
);

// export reaction
module.exports = reactionSchema;
