const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDb connected..");
  })
  .catch((err) => {
    console.log("Mongodb connection error" ,err);
  });