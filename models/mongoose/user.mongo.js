const { emit } = require("nodemon");
const { getDB } = require("../../util/mongodb");
const { ObjectId } = require("mongodb");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");

class UserMongo {
  constructor(username, email, cart, id, phoneNumber, password) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.cart = cart;
    this.id = id;
  }

  save() {
    const db = getDB();
    return generateCollectionHook(db, "users")
      .insertOne(this)
      .then((__) => __)
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex(
      (cp) => cp._d === product._id
    );
    const updatedCart = { iitem: [{ ...product, quantity: 1 }] };
    const db = getDB();
    return generateCollectionHook(db, "users").updatedOne(
      { _id: new ObjectId(this.id) },
      { $set: { cart: updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDB();
    return generateCollectionHook(db, "users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log("User", user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = UserMongo;
