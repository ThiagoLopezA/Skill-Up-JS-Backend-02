const express = require("express");
const { get, getOne, deleteOne, editUser } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);

router.delete('/:id', deleteOne);

router.put('/:id',  editUser);

module.exports = router;
