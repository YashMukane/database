const express = require("express");

const app = express();
const db = require("./models");

const PORT = process.env.PORT || 3000;

try {
  const admin = require('firebase-admin');
  const serviceAccount = require("../database-1/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'feedtheneed-5559a',
  });
} catch (error) {
  console.log(error);
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes'));

db.sequelize.sync({
    // force: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});