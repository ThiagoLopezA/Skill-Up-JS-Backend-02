const express = require("express");
const { getOne, getAll, deleteOne, createCategory } = require("../controllers/categories");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.delete("/:id", deleteOne);
router.post("/", createCategory)

module.exports = router;
