const fs = require("fs");
const path = require("path");
let products = [];
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductFromFile = (cb) => {
  fs.readFileSync(p, (err, fileContent) => {
    // err ? cb([]) : cb(JSON.parse(fileContent));
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    // fs.readFileSync(p, (err, fileContent) => {
    //   console.log(err, fileContent);
    //   if (!err) {
    //     products = JSON.parse(fileContent);
    //   }
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products));
    // });
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products));
    });
  }
  static fetchAll(cb) {
    getProductFromFile(cb);
  }
}

const productModel = new Product();
module.exports = Product;
