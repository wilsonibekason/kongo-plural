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
      .catch((error) => {
        console.log(error);
      });
  }
  static findById(userId) {
    const db = getDB();
    return generateCollectionHook(db, "users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log("User", user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = UserMongo;
