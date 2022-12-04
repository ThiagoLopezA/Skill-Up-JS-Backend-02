const express = require("express");
const { deleteOne } = require("../controllers/transactions");

const router = express.Router();

router.delete("/:id", deleteOne)

module.exports = router;