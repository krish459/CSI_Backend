const mongoose = require('mongoose');
const User = require('./userModel');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['food', 'travel', 'entertainment', 'education', 'other'], required: true },
  date: { type: Date, default: Date.now, required: true }
});

mongoose.model('User', User.schema);
module.exports = mongoose.model('Transaction', TransactionSchema);
