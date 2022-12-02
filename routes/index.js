const express = require("express");
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const authRouter = require("./auth");

const router = express.Router();

// example of a route with index controller get function
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/auth", authRouter);

module.exports = router;
