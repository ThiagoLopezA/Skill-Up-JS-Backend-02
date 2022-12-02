const express = require("express");
const { get, getOne } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

module.exports = router;
