// const products = [];
const Products = require("../models/product.model");

const getProductsController = (req, res, next) => {
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

const addProductsController = (req, res) => {
  const products = new Products(req.body.title);
  products.save();
  res.redirect("/");
};

const fetchProductsController = (req, res, next) => {
  const products = Products.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/",
      // hasProducts: products.length > 0,
      activeShop: true,
      activeAddProduct: true,
      productCSS: true,
      formCSS: true,
    });
  });
  //   res.send(HTML);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
};

const getIndexController = (req, res, next) => {
  const products = Products.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      // hasProducts: products.length > 0,
      activeShop: true,
      activeAddProduct: true,
      productCSS: true,
      formCSS: true,
    });
  });
};

const getCartController = (req, res, next) => {
  res.render("shop/cart", {
    path: "/shop/cart",
    pageTitle: "Cart",
  });
};

const getCheckoutController = (req, res, next) => {
  res.render("/checkout", {
    path: "/cart",
    pageTitle: "Checlout",
  });
};
module.exports = {
  addProducts: addProductsController,
  getProducts: getProductsController,
  fetchProducts: fetchProductsController,
  getIndex: getIndexController,
  getCart: getCartController,
  getCheckout: getCheckoutController,
};
