const { emit } = require("nodemon");
const { getDB } = require("../../util/mongodb");
const { ObjectId } = require("mongodb");
const generateCollectionHook = require("../../hooks/generateCollectionMethod");

class UserMongo {
  constructor(username, email, phoneNumber, password) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
  save() {
    const db = getDB();
    return generateCollectionHook(db, "users")
      .insertOne(this)
      .then((__) => __)
      .catch();
  }
  static findById(prodId) {
    const db = getDB();
    return generateCollectionHook(db, "users").find({ _id: ObjectId(prodId) });
  }
}

module.exports = UserMongo;
