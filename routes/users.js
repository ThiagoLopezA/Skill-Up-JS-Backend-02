const express = require("express");
const {
  get,
  getOne,
  deleteOne,
  editUser,
  create,
  getTransactions,
  getBalance,
} = require("../controllers/users");
const { firstName, lastName, email, password } = require("../schemas/user");
const validation = require("../middlewares/validation");
const authentication = require("../middlewares/authentication");
const uploadOne = require("../middlewares/uploads");
const { ownUser, isAdmin } = require("../middlewares/ownership");
const router = express.Router();

router.get("/", authentication, isAdmin, get);
router.get("/:id", authentication, ownUser, getOne);
router.delete("/:id", authentication, ownUser, deleteOne);
router.post(
  "/register",
  uploadOne,
  validation({ firstName, lastName, email, password }),
  create
);
router.put("/:id", authentication, ownUser, uploadOne, editUser);
router.get("/:id/transactions", authentication, ownUser, getTransactions);
router.get("/:id/balance", authentication, ownUser, getBalance);

module.exports = router;
