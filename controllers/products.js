// const products = [];
const Cart = require("../models/cart.module");
const ProductDB = require("../models/product.db");
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
  // const { title, imageUrl, description, price } = req.body;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const products = new Products(title, imageUrl, description, price);
  products.save();
  res.redirect("/products");
};

const fetchProductsController = (req, res, next) => {
  // const products = Products.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     pageTitle: "All products",
  //     path: "/",
  //     // hasProducts: products.length > 0,
  //     activeShop: true,
  //     activeAddProduct: true,
  //     productCSS: true,
  //     formCSS: true,
  //   });
  // });

  ///  fetch db
  ProductDB.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All products",
        path: "/",
        // hasProducts: products.length > 0,
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.log(err));
  //   res.send(HTML);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
};

const getProductIndexController = (req, res, next) => {
  const prodId = req.params.productId;
  // Products.findById(prodId, (product) => {
  //   res.render("shop/product-detail", {
  //     product: product && product,
  //     pageTitle: product && product.title,
  //     path: `/products`,
  //   });
  // });
  // res.redirect("/");
  /// replace with thiis
  ProductDB.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product && product[0].title,
        path: `/products`,
      });
    })
    .catch((err) => console.log(`Error encountered ${err}`));
};

const getIndexController = (req, res, next) => {
  // const products = Products.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     pageTitle: "Shop",
  //     path: "/",
  //     // hasProducts: products.length > 0,
  //     activeShop: true,
  //     activeAddProduct: true,
  //     productCSS: true,
  //     formCSS: true,
  //   });
  // });
  ProductDB.fetchAll()
    .then(([rows]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
        // hasProducts: products.length > 0,
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

const getCartController = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
  });
};

const postCartController = (req, res, next) => {
  const prodId = req.body.productId;
  Products.findById(prodId, ({ productId, price }) => {
    Cart.addProduct(prodId, price);
  });
  console.log(prodId);
  res.redirect("/cart");
};

const getCheckoutController = (req, res, next) => {
  res.render("/checkout", {
    path: "/checkout",
    pageTitle: "Checlout",
  });
};

const getOrdersControlller = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "/shop/orders",
  });
};

module.exports = {
  addProducts: addProductsController,
  getProducts: getProductsController,
  fetchProducts: fetchProductsController,
  getIndex: getIndexController,
  getCart: getCartController,
  getCheckout: getCheckoutController,
  getOrders: getOrdersControlller,
  geProductIndex: getProductIndexController,
  postCart: postCartController,
};
