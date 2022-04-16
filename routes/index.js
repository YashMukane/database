const express = require("express");

const db = require("../models");

const router = express.Router();
router.use('/auth', require('./auth'));

module.exports = router;