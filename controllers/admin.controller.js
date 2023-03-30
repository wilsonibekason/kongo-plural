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
  });
};

const editAdminController = (req, res, next) => {
  const editMode = req.query.edit;
  !editMode && res.redirect("/");
  res.render("admin/edit-product", {
    pageTitle: "Edit Products",
    path: " /admin/add-product",
    edit: editMode,
  });
};

const addAdminController = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const products = new Products(title, imageUrl, description, price);
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

module.exports = {
  getAdmin: getAdminController,
  addAdmin: addAdminController,
  getAdminProducts: getAdminProductsController,
  editAdmin: editAdminController,
};
