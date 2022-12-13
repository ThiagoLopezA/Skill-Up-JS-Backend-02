const express = require("express");
const {
  getOne,
  deleteOne,
  createOne,
  getAllUserTransactions,
  editOne,
} = require("../controllers/transactions");
const validation = require("../middlewares/validation");
const validateTokenTransaction = require("../middlewares/validateTokenTransaction");
const { ownUser, isAdmin } = require("../middlewares/ownership");
const transactionSchema = require("../schemas/transaction");

const router = express.Router();

router.get("/:id", ownUser, validateTokenTransaction, getOne);
router.delete("/:id", ownUser, validateTokenTransaction, deleteOne);
router.post("/", validation(transactionSchema), ownUser, createOne);
router.get("/", isAdmin, getAllUserTransactions);
router.put("/:id", validation(transactionSchema), ownUser, editOne);

module.exports = router;
