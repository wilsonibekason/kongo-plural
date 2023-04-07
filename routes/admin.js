const express = require("express");
const router = express.Router();
const path = require("path");
const { addProducts, getProducts } = require("../controllers/products");
const {
  addAdmin,
  getAdmin,
  getAdminProducts,
  editAdmin,
  postEditAdmin,
  postDeleteProduct,
} = require("../controllers/admin.controller");
const {
  addAdminMongo,
  editAdminMongo,
  getAdminMongo,
  getAdminProductsMongo,
  postDeleteProductMongo,
  postEditAdminMongo,
  simpleMongo,
} = require("../controllers/mongo/admin.controller.mongo");
const HTML = `
<form action='/admin/add-product' method='POST' style='display: flex; flex-direction: column; align-items: center;'>
<input type='text'  name='title' style='margin: 10px; padding: 10px; border: none; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); transition: box-shadow 0.3s ease-in-out;'/>
<button type="submit" style='padding: 10px; border: none; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); background-color: #4CAF50; color: #fff; cursor: pointer; transition: background-color 0.3s ease-in-out;'>Post Product</button>
</form>
`;
router.get("/add-product", getAdminMongo);

router.get("/products", getAdminProductsMongo);

router.post("/add-product", /*addAdmin*/ addAdminMongo);

router.get("/edit-product/:productId", editAdminMongo);

router.post("/edit-product/:productId", postEditAdminMongo);

router.post("/delete-product", postDeleteProductMongo);

module.exports = router;
// exports.routes = router;
