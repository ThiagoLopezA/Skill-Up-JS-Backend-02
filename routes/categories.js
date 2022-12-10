const express = require("express");
const {
  getOne,
  getAll,
  deleteOne,
  editOne,
  createCategory,
} = require("../controllers/categories");

const validation = require("../middlewares/validation");
const { name, description } = require("../schemas/category");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.put("/:id", validation({ name, description }), editOne);

router.delete("/:id", deleteOne);
router.post("/", validation({ name, description }), createCategory);

module.exports = router;
