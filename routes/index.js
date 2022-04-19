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

router.post('/isValid', async (req, res) => {
    var mobileno = req.body["mobileno"];
    var count = await db.user.count({where: {number: mobileno}});
    if(count <= 0) {
        res.send(false);
    } else {
        res.send(true);
    }
});

module.exports = router;