const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trimmed: true 
    },
    email: { 
        type: String, 
        required: true, 
        match: /.+\@.+\..+/, 
        unique: true
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user'}],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
