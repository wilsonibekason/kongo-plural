const ProductMongo = require("../../models/mongoose/product.mongo");

const getProductsController = (req, res, next) => {};
const addProductsController = (req, res, next) => {};
const fetchProductsController = (req, res, next) => {
  return ProductMongo.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All products",
        path: "/",
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
const getProductIndexController = (req, res, next) => {
  return ProductMongo.fetchAll()
    .then((__) => {
      res.render("shop/index", {
        prods: __,
        pageTitle: "Shop",
        path: "/",
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
const getIndexController = (req, res, next) => {
  const { productId } = req.body;
  return ProductMongo.findById(productId)
    .then((__pd) => {
      res.render("shop/product-detail", {
        product: __pd,
        pageTitle: __pd && __pd.title,
        path: `/products`,
      });
    })
    .catch((err) => console.log(err));
};
const getCartController = (req, res, next) => {};
const postCartController = (req, res, next) => {
  const { productId } = req.body;
  ProductMongo.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((res) => {
      console.log(res);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
const getCheckoutController = (req, res, next) => {};
const getOrdersControlller = (req, res, next) => {};
const postOrderController = (req, res, next) => {};
const deleteCartController = (req, res, next) => {};

module.exports = {
  addProductsMongo: addProductsController,
  getProductsMongo: getProductsController,
  fetchProductsMongo: fetchProductsController,
  getIndexMongo: getIndexController,
  getCartMongo: getCartController,
  getCheckoutMongo: getCheckoutController,
  getOrdersMongo: getOrdersControlller,
  geProductIndexMongo: getProductIndexController,
  postCartMongo: postCartController,
  deleteCartMongo: deleteCartController,
  postOrderMongo: postOrderController,
};
