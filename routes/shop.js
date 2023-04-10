const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/pathz");
const {
  fetchProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  geProductIndex,
  postCart,
  deleteCart,
  postNewCart,
  postOrder,
  getNewCart,
} = require("../controllers/products");
const {
  fetchProductsMongo,
  postCartMongo,
  getCartMongo,
  deleteCartMongo,
  getOrdersMongo,
  postOrderMongo,
  getIndexMongo,
  getProductIndexMongo,
} = require("../controllers/mongo/products.controller.mongo");

router.get("/", getIndex);

router.get("/products", /*fetchProducts*/ fetchProductsMongo);

router.get("/products/:productId", getIndexMongo);

router.get("/cart", getCartMongo);

router.post("/cart", postCartMongo);

router.post("/cart-delete-item", deleteCartMongo);

router.get("/checkout", getCheckout);

router.get("/orders", getOrdersMongo);

router.post("/create-order", postOrderMongo);

module.exports = router;
