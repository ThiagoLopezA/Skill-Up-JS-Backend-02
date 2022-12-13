const express = require("express");
const {
  getOne,
  deleteOne,
  createOne,
  getAllUserTransactions,
  editOne,
} = require("../controllers/transactions");
const validation = require("../middlewares/validation");
const authentication = require("../middlewares/authentication");
const accessTransaction = require("../middlewares/validateTokenTransaction");
const { ownUser, isAdmin } = require("../middlewares/ownership");
const transactionSchema = require("../schemas/transaction");

const router = express.Router();

router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post("/", validation(transactionSchema), createOne);
router.get("/", isAdmin, getAllUserTransactions);
router.put("/:id", validation(transactionSchema), editOne);

module.exports = router;
