const ProductMongo = require("../../models/mongoose/product.mongo");
const mongodb = require("mongodb");
const UserMongo = require("../../models/mongoose/user.mongo");

const getAdminController = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Products",
    path: "/admin/add-product",
    activeShop: true,
    activeAddProduct: true,
    productSS: true,
    formCSS: true,
    editing: false,
  });
};
const editAdminController = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  return ProductMongo.findById(prodId)
    .then((product) => {
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
    prodId,
    req.user._id
  );
  products
    .save()
    .then((_) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};
const addAdminController = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new ProductMongo(
    title,
    description,
    imageUrl,
    price,
    null,
    req.user._id
  );
  console.log("User Response", req.user);
  return product
    .save()
    .then((_) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};
const getAdminProductsController = (req, res, next) => {
  return ProductMongo.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Projects",
        path: "/admin/products",
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
const deleteProductController = (req, res, next) => {
  const { productId } = req.body;
  return ProductMongo.deleteById(productId)
    .then((_) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

const simpleAddProductController = (req, res, next) => {
  return UserMongo.findById("64302f9f3359962abf2a85ee")
    .then((user) => {
      console.log("USER SUCCESSFUL", user);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  getAdminMongo: getAdminController,
  addAdminMongo: addAdminController,
  getAdminProductsMongo: getAdminProductsController,
  editAdminMongo: editAdminController,
  postEditAdminMongo: postEditAdminController,
  postDeleteProductMongo: deleteProductController,
  simpleMongo: simpleAddProductController,
};
