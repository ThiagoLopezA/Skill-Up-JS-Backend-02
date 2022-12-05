const express = require("express");
const { get, getOne, deleteOne, editUser } = require("../controllers/users");
const validation = require("../middlewares/validation")
const { first_name, last_name, password } = require("../schemas/user")

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

router.delete('/:id', deleteOne);

router.put('/:id', validation( {  first_name, last_name, password}), editUser);

module.exports = router;
