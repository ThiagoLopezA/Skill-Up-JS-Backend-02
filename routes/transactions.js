const express = require("express");
const { getOne } = require("../controllers/transactions");

const router = express.Router();

router.get("/:id", getOne); //Falta incorporar un middlaware de autenticación

module.exports = router;
