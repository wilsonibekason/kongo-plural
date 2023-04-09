const { getDB } = require("../../util/mongodb");
const mongo = require("mongodb");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");

class ProductMongo {
  constructor(title, description, imageUrl, price, id, userId) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this._id = id ? new mongo.ObjectId(id) : null;
    this._userId = userId;
  }

  // save() {
  //   let db = getDB();
  //   let dbOp;
  //   if (!this._id) {
  //     dbOp = db
  //       .collection("products")
  //       .updateOne({ _id: this._id }, { $set: this });
  //   } else {
  //     dbOp = db.collection("products").insertOne(this);
  //   }
  //   return dbOp
  //     .then((res) => console.log("Saved Documents" + res))
  //     .catch((err) => console.log(err));
  // }
  save() {
    const db = getDB();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    let db = getDB();
    // return db.collection("products").find();
    return generateCollectionHook(db, "products")
      .find()
      .toArray()
      .then((__) => {
        console.log(__);
        return __;
      })
      .catch((err) => console.log(err));
  }
  static findById(prodId) {
    let db = getDB();
    return generateCollectionHook(db, "products")
      .find({ _id: new mongo.ObjectId(prodId) })
      .next()
      .then((___) => ___)
      .catch((err) => console.log(err));
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
