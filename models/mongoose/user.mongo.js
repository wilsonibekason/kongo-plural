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
  static findById(userId) {
    const db = getDB();
    return generateCollectionHook(db, "users")
      .find({ _id: ObjectId(userId) })
      .then((__) => {
        console.log(__);
        return __;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = UserMongo;
