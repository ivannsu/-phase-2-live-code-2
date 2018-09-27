const mongoose = require('mongoose');
const random = require('mongoose-simple-random');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    min: [6, 'Password minimal 6 karakter']
  },
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

userSchema.plugin(random)

const User = mongoose.model('User', userSchema);
module.exports = User;