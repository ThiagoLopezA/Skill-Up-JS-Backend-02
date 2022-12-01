const express = require("express");
const { getOne } = require("../controllers/categories");

const router = express.Router();

router.get("/:id", getOne);

module.exports = router;
