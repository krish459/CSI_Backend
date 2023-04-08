const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

// CREATE route
router.post('/addtran', async (req, res) => {
  try {
    const { user, amount, category} = req.body;
    const transaction = new Transaction({ user, amount, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ route
router.get('/gettran/:id', async (req, res) => {
  try {
    const transactions = await Transaction.find({user: req.params.id});
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE route
router.patch('/updatetran/:id', async (req, res) => {
  try {
    const { user, amount, category, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { user, amount, category, date },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route
router.delete('/deltran/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
