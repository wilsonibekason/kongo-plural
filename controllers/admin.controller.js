const ProductDB = require("../models/product.db");
const Products = require("../models/product.model");
const ProductsORM = require("../models/product.sequelise");

const getAdminController = (req, res, next) => {
  console.log("In the MiddleWare");
  //   res.send(HTML);
  //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Products",
    path: "/admin/add-product",
    activeShop: true,
    activeAddProduct: true,
    productSS: true,
    formCSS: true,
    editing: false,
  });
};

const editAdminController = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Products.findById(prodId, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Products",
      path: " /admin/edit-product",
      editing: editMode,
      product,
    });
  });

  ///// NEW APPROACH
  req.users
    .getProducts({ where: { id: prodId } })
    // ProductsORM.findAll({ where: { id: prodId } })
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Products",
        path: " /admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditAdminController = (req, res, next) => {
  const {
    productId: prodId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    price: updatedPrice,
    description: updatedDesc,
  } = req.body;
  // const products = new Products(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // products.save();
  // res.redirect("/admin/products");
  /// replace
  const productsDB = new ProductDB(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  productsDB
    .save()
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(`Err saving file  ${err}`));

  /// ORM APPROACH
  ProductsORM.create({
    id: prodId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    description: updatedDesc,
    price: updatedPrice,
  })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));

  // ORM BETTER
  ProductsORM.findAll({ where: { id: prodId } })
    .then((prod) => {
      prod[0].title = updatedTitle;
      prod[0].imageUrl = updatedImageUrl;
      prod[0].description = updatedDesc;
      prod[0].price = updatedPrice;
      return prod[0].save();
    })
    .then(() => {
      console.log("PRODUCT UPDATED");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const addAdminController = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  // const products = new Products(null, title, imageUrl, description, price);
  // products.save();
  // res.redirect("/products");

  /// replace with this
  // const productsDB = new ProductDB(null, title, imageUrl, description, price);
  // productsDB
  //   .save()
  //   .then(() => res.redirect("/products"))
  //   .catch((err) => console.log(`Err saving  file ${err}`));
  //// REQUEST FROM THE DUMMY  users DATA
  console.log("Response from " + req.users);
  req.users
    .createProduct({ title, imageUrl, description, price })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

const getAdminProductsController = (req, res, next) => {
  // return Products.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Projects",
  //     path: "/admin/products",
  //     // hasProducts: products.length > 0,
  //     activeShop: true,
  //     activeAddProduct: true,
  //     productCSS: true,
  //     formCSS: true,
  //   });
  // });

  ////  NEW RETURN STATEMENT
  // return ProductDB.fetchAll()
  //   .then(([rows, columnLists]) => {
  //     res.render("admin/products", {
  //       prods: rows,
  //       pageTitle: "Admin Projects",
  //       path: "/admin/products",
  //       // hasProducts: products.length > 0,
  //       activeShop: true,
  //       activeAddProduct: true,
  //       productCSS: true,
  //       formCSS: true,
  //     });
  //   })
  //   .catch((err) => console.log(err));

  ///// ORM Methods
  req.users
    .findProducts()
    // return ProductsORM.findAll()
    .then((prods) => {
      res.render("admin/products", {
        prods: prods,
        pageTitle: "Admin Projects",
        path: "/admin/products",
        // hasProducts: products.length > 0,
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.log("Error finding " + serr));

  // MONGOOSE APPROACH
  Products.find()
    .populate("userId")
    .then((prods) => {
      res.render("admin/products", {
        prods: prods,
        pageTitle: "Admin Projects",
        path: "/admin/products",
        // hasProducts: products.length > 0,
        activeShop: true,
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
      });
    })
    .catch((err) => console.error(err));
};

const deleteProductController = (req, res, next) => {
  const { productId } = req.body;
  Products.deleteById(productId);
  res.redirect("/admin/products");
  /// ORM UPDATED
  ProductsORM.findAll({ where: { id: productId } })
    .then((prod) => prod[0].destroy())
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

module.exports = {
  getAdmin: getAdminController,
  addAdmin: addAdminController,
  getAdminProducts: getAdminProductsController,
  editAdmin: editAdminController,
  postEditAdmin: postEditAdminController,
  postDeleteProduct: deleteProductController,
};
