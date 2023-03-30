const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "carts.json");
class Cart2 {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.product;
  }
}

class Cart {
  static addProduct(id, productPrice) {
    // fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0, totalQuantity: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      let updatedProduct;
      const existingProductsIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProducts = cart.products[existingProductsIndex];
      if (existingProducts) {
        updatedProduct = { ...existingProducts };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductsIndex] = [...updatedProduct];
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(`error writing file ${err}`);
      });
    });
    // Analyze cart => check it cart exists
    // increase cart quantity or add product to cart model
  }
}

module.exports = Cart;
