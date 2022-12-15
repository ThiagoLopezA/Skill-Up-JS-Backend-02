const express = require("express");
const {
  getOne,
  deleteOne,
  createOne,
  getAllTransactions,
  editOne,
} = require("../controllers/transactions");
const validation = require("../middlewares/validation");
const authentication = require("../middlewares/authentication");
const accessTransaction = require("../middlewares/validateTokenTransaction");
const {
  ownUser,
  isAdmin,
  ownTransaction,
} = require("../middlewares/ownership");
const transactionSchema = require("../schemas/transaction");

const router = express.Router();

router.get("/:id", ownTransaction, accessTransaction, getOne);
router.delete("/:id", ownTransaction, accessTransaction, deleteOne);
router.post("/", validation(transactionSchema), authentication, createOne);
router.get("/", isAdmin, authentication, getAllTransactions);
router.put("/:id", ownTransaction, accessTransaction, editOne);

module.exports = router;
