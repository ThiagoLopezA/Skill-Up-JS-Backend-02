const express = require("express");
const { getOne, deleteOne, createOne, getAllUserTransactions } = require("../controllers/transactions");
const validation = require("../middlewares/validation")
const {amount, date, category, user} = require("../schemas/transaction")
const { ownership } = require("../middlewares/ownership");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.get("/:id", authentication, getOne);

router.delete("/:id", ownership, deleteOne)
router.post("/",  validation({amount, date}), createOne);
router.get("/", getAllUserTransactions);

module.exports = router;
