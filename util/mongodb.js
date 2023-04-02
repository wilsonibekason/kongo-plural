const { MongoAWSError, MongoClient, ServerApiVersion } = require("mongodb");
let uri = `mongodb+srv://nodejs:node--js@nodecomplete.jlakbr7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const connectDB = (cb) =>
  MongoClient.connect(process.env.MONGODB_USER)
    .then((_) => console.log(`DATABASE CONNECTED`) && cb(_))
    .catch((err) => console.log(err))
    .finally();
module.exports = {
  connectDB,
  clientConnect: client,
};
