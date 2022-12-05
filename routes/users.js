const express = require("express");
const { get, getOne, deleteOne, editUser } = require("../controllers/users");
const validation = require("../middlewares/validation")
const { firstName, lastName, email, avatar, password, roleId } = require("../schemas/user")

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

router.delete('/:id', deleteOne);

router.put('/:id', validation( { firstName, lastName, email, avatar, password, roleId }), editUser);

module.exports = router;
