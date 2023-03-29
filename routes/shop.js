const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/pathz");
const { products } = require("./admin");
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

router.get("/", (req, res, next) => {
  console.log("In another MiddleWare", products);
  //   res.send(HTML);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
});

module.exports = router;
