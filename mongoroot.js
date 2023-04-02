const bodyParser = require("body-parser");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const path = require("path");
const NotFoundRoute = require("./routes/404");
require("dotenv").config();
console.log(process.env);
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const { clientConnect, connectDB } = require("./util/mongodb");
app.use("/admin", adminRoutes);

app.use(shopRoute);
app.use(NotFoundRoute);
app.use((req, res, next) => {});
connectDB((client) => {
  app.listen(3000);
  console.log(client);
});
