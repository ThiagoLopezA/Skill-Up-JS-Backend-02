const express = require("express");
const { get, getOne, deleteOne, create } = require("../controllers/users");
const {  first_name, last_name ,email, password } = require("../schemas/user");
const validation = require("../middlewares/validation");
const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

router.delete('/:id', deleteOne);
router.post("/", validation({first_name, last_name, email, password }), create)

module.exports = router;
