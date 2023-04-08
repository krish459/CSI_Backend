const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');
const Account = require("../models/accountModel");


router.post('/addtran', async (req, res) => {
  try {
    const { user, amount, category } = req.body;
    
    // Save the transaction
    const transaction = new Transaction({ user, amount, category });
    await transaction.save();

    // Fetch the account corresponding to the user
    console.log("!user : ",user );
    const account = await Account.findOne({ userId: user });
    console.log("!!: ",account );
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update the account balance based on the transaction type
    if (category === "credit") {
      account.amount += amount;
    } else {
      account.amount -= amount;
    }

    // Save the updated account
    await account.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/detailstrans/:id', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.id });
    
    // prepare the analysis object
    const analysis = {};
    let totalAmount = 0;
    transactions.forEach(({ category, amount }) => {
      if (!analysis[category]) {
        analysis[category] = 0;
      }
      analysis[category] += amount;
      totalAmount += amount;
    });
    analysis.total = totalAmount;

    res.json({  analysis });
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
