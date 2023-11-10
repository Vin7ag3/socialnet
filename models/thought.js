const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// define thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// define virtual reactionCount for the number of reactions associated with a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// create model based on the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// export thought model
module.exports = Thought;
