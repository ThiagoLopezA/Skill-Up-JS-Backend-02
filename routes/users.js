const express = require("express");
const { get, getOne, deleteOne, create } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

router.delete('/:id', deleteOne);
router.post("/", create)

module.exports = router;
