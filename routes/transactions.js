const express = require("express");
const { createOne } = require("../controllers/transactions");
const validation = require("../middlewares/validation")
const {amount, date} = require("../schemas/transaction")
const router = express.Router();

router.post("/", validation({amount, date}), createOne);

module.exports = router;
