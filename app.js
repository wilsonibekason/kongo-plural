const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
// const { engine } = require("express-handlebars");

const { products, routes } = require("./routes/admin");
const shopRoute = require("./routes/shop");
const NotFoundRoute = require("./routes/404");
const { handler, someText, newHandler } = require("./routes");
console.log(someText);
const app = express();
// app.engine(
//   "hbs",
//   engine({
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layouts/",
//     extname: "hbs",
//   })
// );
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", routes);

app.use(shopRoute);
app.use(NotFoundRoute);

app.listen(3000);
