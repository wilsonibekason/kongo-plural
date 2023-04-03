const { getDB } = require("../../util/mongodb");

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
}

module.exports = ProductMongo;
