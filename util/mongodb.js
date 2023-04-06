const { MongoAWSError, MongoClient, ServerApiVersion } = require("mongodb");
let uri = `mongodb+srv://nodecomplete:nodecomplete@nodecomplete.fvs3pc0.mongodb.net/test`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let __db;
const connectDB = (cb) =>
  MongoClient.connect(
    `mongodb+srv://nodecomplete:nodecomplete@nodecomplete.fvs3pc0.mongodb.net/test`
  )
    .then((_) => {
      console.log(`DATABASE CONNECTED`);
      __db = _.db() && cb();
    })
    .catch((err) => console.log("Error occured" + err))
    .finally();

// CONNECTION PULLIng
const getDB = () => {
  if (__db) return __db;
  else throw Error("No database Found");
};
module.exports = {
  connectDB,
  clientConnect: client,
  getDB,
};
