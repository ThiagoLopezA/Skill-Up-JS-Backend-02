const express = require("express");
const { createOne, getAllUserTransactions } = require("../controllers/transactions");

const router = express.Router();

router.post("/", createOne);
router.get("/", getAllUserTransactions);

module.exports = router;
