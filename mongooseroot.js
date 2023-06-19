const bodyParser = require("body-parser");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const path = require("path");
const NotFoundRoute = require("./routes/404");
const mongoose = require("mongoose");
const User = require("./models/mongoose/user.model");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  return User.findById("64303be437a9d19e91bee5cc")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      console.log("response from user", user);
      next();
    })
    .catch((error) => console.log(error));
});
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
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "WisonIbekason",
          email: "Wilsonibekason@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    console.log("DATABASE CONNECTED", _);
    app.listen(8000);
  })
  .catch((err) => console.log("Error Response", err));

module.exports = main;
