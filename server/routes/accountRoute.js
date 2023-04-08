const express = require("express");
const router = express.Router();
const Account = require("../models/accountModel");

// Create account
router.post("/addaccount", async (req, res) => {
  try {
    const account = new Account({
      title: req.body.title,
      amount: req.body.amount,
      currencyType: req.body.currencyType,
      userId: req.body.userId,
    });
    const savedAccount = await account.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all accounts
router.get("/getaccount/:id", async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.params.id });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read account by ID
// router.get('/:id', getAccount, (req, res) => {
//   res.json(res.account);
// });

// Update account by ID
router.patch("/updateaccount/:id", async (req, res) => {
  try {
    const { title, amount, currencyType } = req.body;
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { title, amount, currencyType },
      { new: true }
    );
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete account by ID
router.delete("/delaccount/:id", async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// async function getAccount(req, res, next) {
//   let account;
//   try {
//     account = await Account.findById(req.params.id);
//     if (account == null) {
//       return res.status(404).json({ message: 'Account not found' });
//     }
//     if (account.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.account = account;
//   next();
// }

module.exports = router;
