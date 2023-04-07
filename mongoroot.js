const bodyParser = require("body-parser");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const path = require("path");
const NotFoundRoute = require("./routes/404");
require("dotenv").config();
// console.log(process.env);
const { clientConnect, connectDB } = require("./util/mongodb");
const UserMongo = require("./models/mongoose/user.mongo");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  return UserMongo.findById("64303be437a9d19e91bee5cc")
    .then((user) => {
      req.user = user;
      console.log("User Response", user, req.user);
      next();
    })
    .catch((error) => {
      console.log(error);
      // next(error);
    });
});
app.use("/admin", adminRoutes);
app.use(shopRoute);

app.use(NotFoundRoute);

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
