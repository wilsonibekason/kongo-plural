const ProductMongo = require("../../models/mongoose/product.mongo");
const getAdminController = (req, res, next) => {};
const editAdminController = (req, res, next) => {};
const postEditAdminController = (req, res, next) => {};
const addAdminController = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new ProductMongo(title, description, imageUrl, price);
  return product
    .save()
    .then((_) => res.redirect("/admins/products"))
    .catch((err) => console.log(err));
};
const getAdminProductsController = (req, res, next) => {};
const deleteProductController = (req, res, next) => {};

module.exports = {
  getAdminMongo: getAdminController,
  addAdminMongo: addAdminController,
  getAdminProductsMongo: getAdminProductsController,
  editAdminMongo: editAdminController,
  postEditAdminMongo: postEditAdminController,
  postDeleteProductMongo: deleteProductController,
};
