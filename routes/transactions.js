const express = require("express");
const { getOne, deleteOne, createOne, getAllUserTransactions, editOne } = require("../controllers/transactions");
const validation = require("../middlewares/validation")
const {amount, date, category, user} = require("../schemas/transaction")

const router = express.Router();

router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post("/", validation({ amount, date }), createOne);
router.get("/", getAllUserTransactions);
router.put("/:id",  validation({user, category, amount, date}) ,editOne)

module.exports = router;
