const express = require("express");
const { login } = require("../controllers/auth");
const validation = require("../middlewares/validation");
const authentication = require("../middlewares/authentication");
const { email, password } = require("../schemas/user");
const router = express.Router();

router.post("/login", validation({ email, password }), login);

module.exports = router;
