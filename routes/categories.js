const express = require("express");
const { getOne, getAll } = require("../controllers/categories");

const router = express.Router();

router.get("/", getAll)
router.get("/:id", getOne);

module.exports = router;
