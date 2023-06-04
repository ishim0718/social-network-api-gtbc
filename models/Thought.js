const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String, 
        required: true, 
        maxlength: 280 ,
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
    username: { 
        type: Schema.Types.String, 
        rfe: 'user', 
        required: true 
    },
    reaction: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reaction.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
