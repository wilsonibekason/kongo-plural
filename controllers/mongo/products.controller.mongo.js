const ProductMongo = require("../../models/mongoose/product.mongo");
const UserMongo = require("../../models/mongoose/user.mongo");

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
const getCartController = (req, res, next) => {
  return req.user
    .getCart()
    .then((cartItems) => {
      console.log("Cart Items Response", cartItems);
      return res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Cart",
        products: cartItems,
      });
    })
    .catch((err) => console.log(err));
};
const postCartController = (req, res, next) => {
  const { productId } = req.body;
  console.log("User Body", req.user);
  return ProductMongo.findById(productId)
    .then((product) => {
      console.log("Selected Cart product", product);
      return req.user.addToCart(product);
    })
    .then((res) => {
      console.log(res);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
const getCheckoutController = (req, res, next) => {};
const getOrdersControlller = (req, res, next) => {
  return req.user.getOrders()
};
const postOrderController = (req, res, next) => {
  return req.user
    .addOrder()
    .then((res) => {
      console.log("PRODUCT ORDERS ADDED SUCCESSFULLY");
    })
    .catch((err) => console.log(err));
};
const deleteCartController = (req, res, next) => {
  const { productId } = req.body;
  return req.user
    .deleteItemFromCart(productId)
    .then((res) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

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
