const { MongoAWSError, MongoClient } = require("mongodb");

MongoClient.connect(process.env.MONGODB_USER)
  .then((_) => console.log(`DATABASE CONNECTED`))
  .catch((err) => console.log(err))
  .finally();
