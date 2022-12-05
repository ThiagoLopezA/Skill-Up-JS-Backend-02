const express = require("express");
const { get, getOne, deleteOne, editUser,  create } = require("../controllers/users");
const {  first_name, last_name ,email, password } = require("../schemas/user");
const validation = require("../middlewares/validation");
const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

router.delete('/:id', deleteOne);
router.post("/", validation({first_name, last_name, email, password }), create)

router.put('/:id',  editUser);

module.exports = router;
