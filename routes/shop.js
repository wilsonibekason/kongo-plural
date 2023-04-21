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

// connect docker to google cloud storage
//// sudo adduser apps

//// docker run -d -p 3000:3000 -p 3001:3001 -p 3002:3002 -p 3003:3003 -p 3004:3004 -p 3005:3005 -p 3006:3006 -p 3007:3007 -p 3008:3008 -p 3009:3009 -p 3010:3010 -p 3011:3011 -p 3012:3012 -p 3013:3013 -p 3014:3014 -p 3015:3015 -
// sudo usermod -aG sudo apps
// su apps
/**
 * sudo ls
 * exit 
 * su - apps
 */