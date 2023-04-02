const { MongoAWSError, MongoClient, ServerApiVersion } = require("mongodb");
let uri = `mongodb+srv://nodejs:node--js@nodecomplete.jlakbr7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const connectDB = (cb) =>
  MongoClient.connect(process.env.MONGOOSE_USER)
    .then((client) => console.log(`DATABASE CONNECTED`) && cb(client))
    .catch((err) => console.log("Error occured" + err))
    .finally();
module.exports = {
  connectDB,
  clientConnect: client,
};
