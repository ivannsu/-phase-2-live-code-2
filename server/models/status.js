const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  content: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
}, {
  timestamps: true
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;