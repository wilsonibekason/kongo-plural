class ProductDB {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.ttile = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}
  fetchAll() {}
  deleteById() {}
  findById() {}
}

module.exports = ProductDB;
