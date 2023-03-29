const express = require("express");
const router = express.Router();
const path = require("path");
const HTML = `
<form action='/admin/add-product' method='POST' style='display: flex; flex-direction: column; align-items: center;'>
<input type='text'  name='title' style='margin: 10px; padding: 10px; border: none; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); transition: box-shadow 0.3s ease-in-out;'/>
<button type="submit" style='padding: 10px; border: none; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); background-color: #4CAF50; color: #fff; cursor: pointer; transition: background-color 0.3s ease-in-out;'>Post Product</button>
</form>
`;
const products = [];
router.get("/add-product", (req, res, next) => {
  console.log("In the MiddleWare");
  //   res.send(HTML);
  //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Products",
    path: "/admin/add-product",
    activeShop: true,
    activeAddProduct: true,
    productSS: true,
    formCSS: true,
  });
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;
exports.routes = router;
exports.products = products;
