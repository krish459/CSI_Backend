// const mongoose = require('mongoose');

// const goalSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   finalGoal: {
//     type: Number,
//     required: true,
//   },
//   timePeriod: {
//     type: Number,
//     required: true,
//   },
//   monthlyInvestment: {
//     type: Number,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
// }, { timestamps: true });

// const Goal = mongoose.model('Goal', goalSchema);

// module.exports = Goal;

// const express = require('express');
// const router = express.Router();
// const Goal = require('../models/goal');

// // Create a new goal
// router.post('/', async (req, res) => {
//   try {
//     const { title, finalGoal, timePeriod, userId } = req.body;

//     const monthlyInvestment = finalGoal / timePeriod;

//     const goal = new Goal({
//       title,
//       finalGoal,
//       timePeriod,
//       monthlyInvestment,
//       userId,
//     });

//     await goal.save();

//     res.status(201).json(goal);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get all goals
// router.get('/', async (req, res) => {
//   try {
//     const goals = await Goal.find();

//     res.json(goals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get a single goal
// router.get('/:id', getGoal, (req, res) => {
//   res.json(res.goal);
// });

// // Update a goal
// router.patch('/:id', getGoal, async (req, res) => {
//   try {
//     const { title, finalGoal, timePeriod } = req.body;

//     if (title) {
//       res.goal.title = title;
//     }

//     if (finalGoal) {
//       res.goal.finalGoal = finalGoal;
//       res.goal.monthlyInvestment = finalGoal / timePeriod;
//     }

//     if (timePeriod) {
//       res.goal.timePeriod = timePeriod;
//       res.goal.monthlyInvestment = res.goal.finalGoal / timePeriod;
//     }

//     await res.goal.save();

//     res.json(res.goal);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a goal
// router.delete('/:id', getGoal, async (req, res) => {
//   try {
//     await res.goal.remove();

//     res.json({ message: 'Goal deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Middleware function to get a single goal by ID
// async function getGoal(req, res, next) {
//   let goal;

//   try {
//     goal = await Goal.findById(req.params.id);

//     if (goal == null) {
//       return res.status(404).json({ message: 'Goal not found' });
//     }
//   } catch (
