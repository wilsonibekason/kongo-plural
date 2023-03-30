const fs = require("fs");
const path = require("path");
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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save(cb) {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
          cb([]);
        } else {
          cb(products);
        }
      });
    });
  }
  static fetchAll(cb) {
    return getProductFromFile(cb);
  }
}

const productModel = new Product();
module.exports = Product;
