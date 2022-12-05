const express = require("express");
const { getOne, deleteOne, createOne, getAllUserTransactions } = require("../controllers/transactions");

const router = express.Router();

router.get("/:id", getOne);

router.delete("/:id", deleteOne)
router.post("/", createOne);
router.get("/", getAllUserTransactions);

module.exports = router;
