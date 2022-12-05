const express = require("express");
const { getOne } = require("../controllers/transactions");

const router = express.Router();

router.get("/:id", getOne);

module.exports = router;
