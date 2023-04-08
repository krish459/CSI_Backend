const mongoose = require('mongoose');

const PlannedPaymentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  finalGoal: {
    type: Number,
    required: true
  },
  timePeriod: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monthlyInvestment: {
    type: Number,
    default: function() {
      return this.finalGoal / this.timePeriod;
    }
  },
  amountPaid: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('PlannedPayment', PlannedPaymentSchema);
