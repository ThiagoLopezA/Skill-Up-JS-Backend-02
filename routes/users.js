const express = require('express');
const { get, deleteOne } = require('../controllers/users');

const router = express.Router();

router.get('/', get);

router.delete('/:id', deleteOne);

module.exports = router;
