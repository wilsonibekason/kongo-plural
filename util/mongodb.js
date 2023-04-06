const { MongoAWSError, MongoClient, ServerApiVersion } = require("mongodb");
let uri = `mongodb+srv://nodecomplete:nodecomplete@nodecomplete.fvs3pc0.mongodb.net/products?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let __db;
const connectDB = (cb) =>
  MongoClient.connect(
    `mongodb+srv://nodecomplete:nodecomplete@nodecomplete.fvs3pc0.mongodb.net/products?retryWrites=true&w=majority`
  )
    .then((_) => {
      console.log(`DATABASE CONNECTED`, _);
      __db = _.db();
      cb();
    })
    .catch((err) => console.log("Error occured" + err))
    .finally();

// CONNECTION PULLIng
const getDB = () => {
  if (__db) {
    return __db;
  }
  throw "No database found!";
};
module.exports = {
  connectDB,
  clientConnect: client,
  getDB,
};
