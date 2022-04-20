const express = require("express");


const db = require("../models");

const router = express.Router();

router.post("/donation", async (req, res) => {
    const bodyData = req.body;
    const createResponse = await db.donor.create(bodyData);
    res.json(createResponse);
  
    try {
      const admin = require('firebase-admin');
      const volsWithinDistance = await distanceCalculator(bodyData.latitute, bodyData.longitute);
      // console.log(volsWithinDistance);
      const message = {
        notification: {
          title: 'Donation Available',
          body: 'DONATION'
        },
        data: {
        case: JSON.stringify(createResponse)
        },
        tokens: volsWithinDistance.map((vol) => vol.Token),
      };
  
      admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  const haversine_distance = (destination, soruce) => {
    var R = 6371.0710; // Radius of the Earth in KM
    var rlat1 = destination.latitute * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = soruce.latitute * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (soruce.longitute - destination.longitute) * (Math.PI / 180); // Radian difference (longitudes)
  
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }
  
  const distanceCalculator = async (distressLat, distressLng) => {
    let volsWithinDistance = [];
  
    const destination = {
      latitute: distressLat,
      longitute: distressLng
    }
  
    const sourceData = await db.donor.findAndCountAll();
  
    for (i = 0; i < sourceData.count; i++) {
      const soruce = {
        latitute: sourceData["rows"][i]["latitute"],
        longitute: sourceData["rows"][i]["longitute"]
      }
      let distance = haversine_distance(destination, soruce)
      // console.log(distance);
      // console.log(sourceData["rows"][i]["Name"]);
      if (distance < 10) {
        volsWithinDistance.push(sourceData["rows"][i]);
        // console.log(volsWithinDistance);
      }
    }
    return volsWithinDistance;
  }
  

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