// Render all expenses for a user
app.get('/getexpenses/:id', async (req, res) => {
    const expenses = await Expense.find({ userId: req.params._id });
    res.render('expenses', { expenses });
  });
  
  // Add a new expense
  app.post('/addexpenses', async (req, res) => {
    const { totalFoodAmount,totalTravelAmount,totalEntertainmentAmount,totalEducationAmount, spendFoodAmount, spendTravelAmount, spendEntertainmentAmount, spendEducationAmount } = req.body;
    const expense = new Expense({
      totalFoodAmount,
      spendFoodAmount,
      spendTravelAmount,
      spendEntertainmentAmount,
      spendEducationAmount,
      totalEntertainmentAmount,
      totalEducationAmount,
      totalTravelAmount,
      userId: req.user._id
    });
    await expense.save();
    res.redirect('/expenses');
  });
  