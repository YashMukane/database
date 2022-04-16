const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/users", async (req, res) => {
    var users = await db.user.findAll();
    res.send(users);
});

router.post('/users', async (req, res) => {
    var userData = req.body;
    var user = await db.user.create(userData);
    res.send(user);
});


module.exports = router;