const db = require("../util/database");

class ProductDB {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.ttile = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("INSER INTO products VALUES (?, ?, ?, ?) ", [
      this.title,
      this.description,
      this.imageUrl,
      this.price,
    ]);
  }
  static fetchAll() {
    db.execute("SELECT * FROM products");
  }
  static deleteById(id) {}
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE id products.id = ?", [id]);
  }
}

module.exports = ProductDB;
