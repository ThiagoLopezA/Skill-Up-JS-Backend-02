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
const {
  ownUser,
  isAdmin,
} = require("../middlewares/ownership");
const transactionSchema = require("../schemas/transaction");

const router = express.Router();

router.get("/:id", ownUser, accessTransaction, getOne);
router.delete("/:id", ownUser, accessTransaction, deleteOne);
router.post(
  "/",
  validation(transactionSchema),
  authentication,
  ownUser,
  createOne
);
router.get("/", isAdmin, getAllUserTransactions);
router.put("/:id", validation(transactionSchema), ownUser, editOne);

module.exports = router;
