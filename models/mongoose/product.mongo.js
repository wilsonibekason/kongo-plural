const { getDB } = require("../../util/mongodb");
const mongo = require("mongodb");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");

class ProductMongo {
  constructor(title, description, imageUrl, price, id, newId) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this._id = id ? new mongo.ObjectId(id) : null;
    this._newId = newId;
  }

  save() {
    const db = getDB();
    let dbOp;
    if (!this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongo.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertMany(this);
    }
    return dbOp
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
  static deleteById(prodId) {
    let db = getDB();
    return generateCollectionHook(db, "products")
      .deleteOne({ _id: new mongo.ObjectId(prodId) })
      .then((_) => {
        let prodTitle = this.findById(prodId).then(({ title }) => title);
        console.log(`${prodTitle} has been deleted `);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = ProductMongo;
