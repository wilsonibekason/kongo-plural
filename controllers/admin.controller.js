const Products = require("../models/product.model");

const getAdminController = (req, res, next) => {
  console.log("In the MiddleWare");
  //   res.send(HTML);
  //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Products",
    path: "/admin/add-product",
    activeShop: true,
    activeAddProduct: true,
    productSS: true,
    formCSS: true,
  });
};

const addAdminController = (req, res) => {
  const products = new Products(req.body.title);
  products.save();
  res.redirect("/");
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
};
