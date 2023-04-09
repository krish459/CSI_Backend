const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  totalFoodAmount: {
    type: Number,
    default: 0
  },
  totalTravelAmount: {
    type: Number,
    default: 0
  },
  totalEntertainmentAmount: {
    type: Number,
    default: 0
  },
  totalEducationAmount: {
    type: Number,
    default: 0
  },
  spendFoodAmount: {
    type: Number,
    default: 0
  },
  spendTravelAmount: {
    type: Number,
    default: 0
  },
  spendEntertainmentAmount: {
    type: Number,
    default: 0
  },
  spendEducationAmount: {
    type: Number,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
