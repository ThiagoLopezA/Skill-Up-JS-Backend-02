const express = require("express");
const { getOne, getAll, deleteOne } = require("../controllers/categories");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.delete("/:id", deleteOne);

module.exports = router;
