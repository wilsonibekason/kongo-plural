const ProductMongo = require("../../models/mongoose/product.mongo");
const UserMongo = require("../../models/mongoose/user.mongo");
const ProductMongoose = require("../../models/mongoose2/product.mongoose");

const getProductsController = (req, res, next) => {};
const addProductsController = (req, res, next) => {};
const fetchProductsController = async (req, res, next) => {
  // return ProductMongo.fetchAll()
  try {
    const products = await ProductMongoose.find();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/",
      activeShop: true,
      activeAddProduct: true,
      productCSS: true,
      formCSS: true,
    });
  } catch (err) {
    return console.log(err);
  }
};
const getProductIndexController = async (req, res, next) => {
  // return ProductMongo.fetchAll()
  try {
    const __ = await ProductMongoose.find();
    res.render("shop/index", {
      prods: __,
      pageTitle: "Shop",
      path: "/",
      activeShop: true,
      activeAddProduct: true,
      productCSS: true,
      formCSS: true,
    });
  } catch (err) {
    return console.log(err);
  }
};
const getIndexController = async (req, res, next) => {
  const { productId } = req.body;
  console.log("Request body response", req.body);
  try {
    await ProductMongoose.findById(productId)
      .then((__pd) => {
        return res.render("shop/product-detail", {
          product: __pd,
          pageTitle: __pd && __pd.title,
          path: `/products`,
        });
      })
      .catch((err) => console.log("Error Response", err));
  } catch (err) {
    return console.log(err);
  }
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
const postCartController = (req, response, next) => {
  const { productId } = req.body;
  console.log("User Body", req.user);
  return ProductMongo.findById(productId)
    .then((product) => {
      console.log("Selected Cart product", product);
      return req.user.addToCart(product);
    })
    .then((res) => {
      console.log(res);
      response.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
const getCheckoutController = (req, res, next) => {};
const getOrdersControlller = (req, res, next) => {
  return req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "/shop/orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};
const postOrderController = (req, res, next) => {
  return req.user
    .addOrder()
    .then((__) => {
      console.log("PRODUCT ORDERS ADDED SUCCESSFULLY");
      return res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
const deleteCartController = (req, res, next) => {
  const { productId } = req.body;
  return req.user
    .deleteItemFromCart(productId)
    .then((r) => {
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
  getProductIndexMongo: getProductIndexController,
  postCartMongo: postCartController,
  deleteCartMongo: deleteCartController,
  postOrderMongo: postOrderController,
};
