const ProductMongo = require("../../models/mongoose/product.mongo");
const mongodb = require("mongodb");

const getAdminController = (req, res, next) => {
  return ProductMongo.fetchAll().then((__) => {});
};
const editAdminController = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  ProductMongo.findById(prodId)
    .then(() => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Products",
        path: " /admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((err) => console.log(err));
};
const postEditAdminController = (req, res, next) => {
  const {
    productId: prodId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    price: updatedPrice,
    description: updatedDesc,
  } = req.body;

  const products = new ProductMongo(
    updatedTitle,
    updatedDesc,
    updatedImageUrl,
    updatedPrice,
    // new mongodb.ObjectId(prodId)
    prodId
  );
  products
    .save()
    .then((_) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};
const addAdminController = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new ProductMongo(title, description, imageUrl, price);
  return product
    .save()
    .then((_) => res.redirect("/admins/products"))
    .catch((err) => console.log(err));
};
const getAdminProductsController = (req, res, next) => {};
const deleteProductController = (req, res, next) => {
  const { productId } = req.body;
  return ProductMongo.deleteById(productId)
    .then((_) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

module.exports = {
  getAdminMongo: getAdminController,
  addAdminMongo: addAdminController,
  getAdminProductsMongo: getAdminProductsController,
  editAdminMongo: editAdminController,
  postEditAdminMongo: postEditAdminController,
  postDeleteProductMongo: deleteProductController,
};
