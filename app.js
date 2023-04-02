const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
// const { engine } = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const NotFoundRoute = require("./routes/404");
const { handler, someText, newHandler } = require("./routes");
const db = require("./util/database");
const sequelize = require("./util/dbORM");
const Products = require("./models/product.sequelise");
const User = require("./models/user.sequelize");
const Cart = require("./models/cart.sequelize");
const CartItem = require("./models/cart-item.sequenlize");

const someArray = [3, 5, 4, 6, 1, 7, 45, 6];
const [a, b, c, d, e, f] = someArray;

console.log(someText, a, b, c, e, f);
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
app.use((req, res, next) => {
  User.findAll({ where: { id: 1 } })
    .then((user) => (req.user = user[0] && next()))
    .catch((err) => console.log(err));
});
db.execute("SELECT * FROM  products")
  .then(([rows]) => console.log(rows))
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);

app.use(shopRoute);
app.use(NotFoundRoute);
Products.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Products);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Products, { through: CartItem });
Products.belongsToMany(Cart, { through: CartItem });
sequelize
  .sync({ force: true })
  .then(() => {
    return User.findAll({ where: { id: 1 } });
  })
  .then((user) => {
    if (!user[0])
      return User.create({ name: "wilson", email: "Wilsoibekason@gmail.com" });
    else return user[0];
  })
  .then((o) => {
    console.log(o);
    app.listen(3000);
  })
  .catch((err) => console.log(err))
  .finally();
