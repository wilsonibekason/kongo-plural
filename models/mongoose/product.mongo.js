const { getDB } = require("../../util/mongodb");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");

class ProductMongo {
  constructor(title, description, imageUrl, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    const db = getDB();
    return db
      .collection("products")
      .insertMany(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    let db = getDB();
    // return db.collection("products").find();
    return generateCollectionHook(db, "products")
      .find()
      .toArray()
      .then((__) => __)
      .catch((err) => console.log(err));
  }
  static findById(prodId) {
    let db = getDB();
    return generateCollectionHook(db, "products")
      .find({ _id: prodId })
      .next()
      .then((___) => ___)
      .catch(err >= console.log(err));
  }
}

module.exports = ProductMongo;
