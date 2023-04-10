const bodyParser = require("body-parser");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const path = require("path");
const NotFoundRoute = require("./routes/404");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoute);
app.use(NotFoundRoute);

async function main() {
  await mongoose.connect(
    "mongodb+srv://mongoose:mongoose_db@mongoose.oscayao.mongodb.net/mongoose?retryWrites=true&w=majority"
  );
}
main()
  .then((_) => {
    console.log("DATABASE CONNECTED", _);
    app.listen(8000);
  })
  .catch((err) => console.log(err));
