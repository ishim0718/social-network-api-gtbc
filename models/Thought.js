const { Schema, Thought } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 280 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    username: { 
        type: Schema.Types.String, 
        ref: 'user', 
        required: true 
    },
    reaction: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
