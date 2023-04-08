const express = require("express");
const router = express.Router();
const PlannedPayment = require("../models/plannedModel");
const Account = require("../models/accountModel");

// Get all planned payments
router.get("/getpps/:id", async (req, res) => {
  try {
    const plannedPayments = await PlannedPayment.find({ userId: req.params.id });
    res.json(plannedPayments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get a specific planned payment
router.put("/specificpps/:id", async (req, res) => {
  try {
    const plannedPayment = await PlannedPayment.findById(req.params.id);
    if (!plannedPayment) {
      return res.status(404).json({ msg: "Planned payment not found" });
    }
    console.log(plannedPayment);
    plannedPayment.amountPaid += plannedPayment.monthlyInvestment;
    await plannedPayment.save();

    const account = await Account.findOne({
      userId: plannedPayment.userId.valueOf(),
    });
    console.log("!!: ", plannedPayment.userId.valueOf());
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Update the account balance based on the transaction type
    console.log(
      "PlannedPayment.monthlyPayment:",
      plannedPayment.monthlyInvestment
    );

    account.amount -= plannedPayment.monthlyInvestment;

    // Save the updated account
    await account.save();

    res.json(plannedPayment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Create a new planned payment
router.post("/addpps", async (req, res) => {
  const { title, finalGoal, timePeriod, userId } = req.body;

  try {
    const newPlannedPayment = new PlannedPayment({
      title,
      finalGoal,
      timePeriod,
      userId,
    });

    const plannedPayment = await newPlannedPayment.save();
    res.json(plannedPayment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update a planned payment
router.put("/updatepps/:id", async (req, res) => {
  const { title, finalGoal, timePeriod } = req.body;

  try {
    let plannedPayment = await PlannedPayment.findById(req.params.id);

    if (!plannedPayment) {
      return res.status(404).json({ msg: "Planned payment not found" });
    }

    if (plannedPayment.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    plannedPayment.title = title || plannedPayment.title;
    plannedPayment.finalGoal = finalGoal || plannedPayment.finalGoal;
    plannedPayment.timePeriod = timePeriod || plannedPayment.timePeriod;

    plannedPayment = await plannedPayment.save();

    res.json(plannedPayment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete a planned payment
router.delete("/deletepps/:id", async (req, res) => {
  try {
    let plannedPayment = await PlannedPayment.findById(req.params.id);

    if (!plannedPayment) {
      return res.status(404).json({ msg: "Planned payment not found" });
    }

    await plannedPayment.remove();

    res.json({ msg: "Planned payment removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
