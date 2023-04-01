const fs = require("fs");
const path = require("path");
const Cart = require("./cart.module");
let products = [];
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(`Error reading file: ${err}`);
      cb([]);
    } else {
      try {
        const products = JSON.parse(fileContent);
        cb(products);
      } catch (err) {
        console.log(`Error parsing JSON: ${err}`);
        cb([]);
      }
    }
  });
};

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductFromFile((products) => {
      if (this.id) {
        let existingProductsIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        let updatedProducts = [...products];
        updatedProducts[existingProductsIndex] = this;
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(`Error writing file: ${err}`);
        });
      } else {
        this.id = Math.floor(Math.random() * 999).toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(`Error writing file: ${err}`);
        });
      }
    });
  }
  static fetchAll(cb) {
    return getProductFromFile(cb);
  }
  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          //// delete updated Products from  the cart
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
}

const productModel = new Product();
module.exports = Product;
