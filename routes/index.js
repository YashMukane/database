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

router.get('/users/:number', async (req, res) => {
    // var userData = req.body;
    var num = req.params.number;
    console.log(num);
    var user = await db.user.findAll({where:{number: num},},);
    console.log(user);
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
router.get("/donors", async (req, res) => {
    var donors = await db.donor.findAll();
    res.send(donors);
});
router.post('/donors', async (req, res) => {
    var donorData = req.body;
    var donor = await db.donor.create(donorData);
    res.send(donor);
});

module.exports = router;