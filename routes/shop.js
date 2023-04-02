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
const HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
    <style>
      /* Styles for the header */
      header {
        background: linear-gradient(to bottom, #333333, #555555);
        color: #ffffff;
        padding: 20px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        animation: fadeInDown 0.5s ease;
      }

      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Styles for the text */
      .text {
        font-size: 3rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-transform: capitalize;
        text-align: center;
        font-weight: 600;
      }

      /* Media query for responsiveness */
      @media only screen and (max-width: 768px) {
        .text {
          font-size: 2rem;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <h1 class="text">Hello Text</h1>
    </header>
  </body>
</html>
`;

router.get("/", getIndex);

router.get("/products", fetchProducts);

router.get("/products/:productId", geProductIndex);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post("/cart-delete-item", deleteCart);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);

router.post("/create-order", postOrder);

module.exports = router;
