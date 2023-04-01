const Products = require("../models/product.model");

const getAdminController = (req, res, next) => {
  console.log("In the MiddleWare");
  //   res.send(HTML);
  //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
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
  Products.findById(prodId, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Products",
      path: " /admin/edit-product",
      editing: editMode,
      product,
    });
  });
};

const postEditAdminController = (req, res, next) => {
  const {
    productId: prodId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    price: updatedPrice,
    description: updatedDesc,
  } = req.body;
  const products = new Products(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  products.save();
  res.redirect("/admin/products");
};

const addAdminController = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const products = new Products(null, title, imageUrl, description, price);
  products.save();
  res.redirect("/products");
};

const getAdminProductsController = (req, res, next) => {
  return Products.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Projects",
      path: "/admin/products",
      // hasProducts: products.length > 0,
      activeShop: true,
      activeAddProduct: true,
      productCSS: true,
      formCSS: true,
    });
  });
};

const deleteProductController = (req, res, next) => {
  const { productId } = req.body;
  Products.deleteById(productId);
  res.redirect("/admin/products");
};

module.exports = {
  getAdmin: getAdminController,
  addAdmin: addAdminController,
  getAdminProducts: getAdminProductsController,
  editAdmin: editAdminController,
  postEditAdmin: postEditAdminController,
  postDeleteProduct: deleteProductController,
};
