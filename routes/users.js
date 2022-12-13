const express = require("express");
const {
  get,
  getOne,
  deleteOne,
  editUser,
  create,
} = require("../controllers/users");
const { firstName, lastName, email, password } = require("../schemas/user");
const validation = require("../middlewares/validation");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", authentication, get);
router.get("/:id", authentication, getOne);
router.delete("/:id", authentication, deleteOne);
router.post(
  "/register",
  validation({ firstName, lastName, email, password }),
  create
);
router.put("/:id", authentication, editUser);

module.exports = router;
