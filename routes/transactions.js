const express = require("express");
const { createOne } = require("../controllers/transactions");

const router = express.Router();

router.post("/", createOne);

module.exports = router;
