const mongoose = require("mongoose");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);

userSchema.methods.addToCart = function (product) {
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
      //   productId: new ObjectId(product._id),
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = { items: updatedCartItems };
  cart = updatedCart;
  this.save();
  //   const db = getDB();
  //   return generateCollectionHook(db, "users").updateOne(
  //     { _id: new ObjectId(this._id) },
  //     { $set: { cart: updatedCart } }
  //   );
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedAfterDeleteCartItems = this.cart.items.filter((item) => {
    return item._id.toString() !== productId.toString();
  });
  this.cart.items = updatedAfterDeleteCartItems;
  return this.save();
};
 