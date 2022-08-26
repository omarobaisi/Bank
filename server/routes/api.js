const express = require("express");
const router = express.Router();
const Transaction = require("../model/transaction")

const createError = (error, explination) => {
    const errorMessage = {
      error: error,
      detail: {
        surname: explination,
      },
    };
    return JSON.stringify(errorMessage)
};

router.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find({})
        res.send(transactions)
    } catch(e) {
        const error = createError(
            e.message,
            "We couldn't find the transactions that you are looking for"
        );
        response.status(404).send(error);
    }
})

router.post("/transaction", async (req, res) => {
    try {
        const transaction = req.body;
        const newtransaction = new Transaction({ amount: transaction.amount, category: transaction.category, vendor: transaction.vendor })
        await newtransaction.save();
        res.send(newtransaction);
    } catch(e) {
        const error = createError(
            e.message,
            "We couldn't create a new transaction"
        );
        res.status(404).send(error);
    }
})

router.delete("/transaction/:id", async (req, res) => {
    try {
        const transactionId = req.params.id;
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId, { new: true })
        res.send(deletedTransaction);
    } catch(e) {
        const error = createError(
            e.message,
            "We couldn't find and delete the transaction"
        );
        res.status(404).send(error);
    }
})

router.get("/breakdown", async (req, res) => {
    try {
        const transactions = await Transaction.aggregate([
            { $group: 
               { _id: "$category", 
               totalSalaries: { $sum: "$amount" } } }
          ])
        res.send(transactions)
    } catch(e) {
        const error = createError(
            e.message,
            "We couldn't find the transactions that you are looking for"
        );
        response.status(404).send(error);
    }
})

module.exports = router;