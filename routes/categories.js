const express = require("express");
const { getOne, deleteOne } = require("../controllers/categories");

const router = express.Router();

router.get("/:id", getOne);

router.delete("/:id", deleteOne);

module.exports = router;
