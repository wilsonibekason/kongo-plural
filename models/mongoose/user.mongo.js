const { emit } = require("nodemon");
const { getDB } = require("../../util/mongodb");
const { ObjectId } = require("mongodb");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");
const generateID = (id) => new ObjectId(id);
class UserMongo {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    // this._id = id ? new ObjectId(id) : null;
    this._id = id;
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
    console.log(`model ${product._id}`);
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      console.log(`cp ${cp._id}`);
      return cp._id.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDB();
    return generateCollectionHook(db, "users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }
  getCart() {
    const db = getDB();
    const productIds = this.cart.items.map((i) => i._id);
    return generateCollectionHook(db, "products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) =>
        products.map((p) => {
          console.log(products);
          return {
            ...p,
            // quantity: this.cart.items.map((i) => {
            //   console.log("get ", i._id, p._id);
            //   return (
            //     generateID(i._id).toString() === generateID(p._id).toString()
            //   );
            // }).quantity,
            quantity: this.cart.items.find((i) => {
              let itemID = new ObjectId(i._id).toString();
              let ProductID = new ObjectId(p._id).toString();
              return itemID === ProductID;
            }).quantity,
          };
        })
      );
  }
  deleteItemFromCart(productId) {
    const updatedAfterDeleteCartItems = this.cart.items.filter((item) => {
      return item._id.toString() !== productId.toString();
    });
    const db = getDB();
    return generateCollectionHook(db, "users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: { items: updatedAfterDeleteCartItems } } }
    );
  }

  addOrder() {
    const db = getDB();
    return this.getCart()
      .then((products) => {
        const orders = {
          items: products ? products : this.cart.items,
          user: {
            _id: new ObjectId(this._id),
            username: this.username,
          },
        };
        return db.collection("orders").insertOne(orders ? orders : this.cart);
      })
      .then((res) => {
        this.cart = { items: [] };
        return generateCollectionHook(db, "users").updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: { items: [] } } }
        );
      });
  }
  getOrders() {
    const db = getDB();
    return generateCollectionHook(db, "orders")
      .find({
        "user._id": new ObjectId(this._id),
      })
      .toArray();
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
