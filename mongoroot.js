const bodyParser = require("body-parser");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const path = require("path");
const NotFoundRoute = require("./routes/404");
require("dotenv").config();
// console.log(process.env);
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const { clientConnect, connectDB } = require("./util/mongodb");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
const UserMongo = require("./models/mongoose/user.mongo");

app.use(shopRoute);
app.use(NotFoundRoute);
app.use(async (req, res, next) => {
  try {
    const user = await UserMongo.findById(1);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

connectDB((client) => {
  app.listen(8000);
  console.log(client);
});

// clientConnect
//   .connect((err) => {
//     console.log(err);
//   })
//   .then((res) => {
//     console.log(`Connected ${res}`);
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));
