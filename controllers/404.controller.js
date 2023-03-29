const notFoundController = (req, res, next) => {
  //   res.status(404).send(HTML);
  //   res.status(404).sendFile(__dirname, "../", "views", "404.html");
  res.render("404", { pageTitle: "Not Found Page" });
};

module.exports = {
  notFound: notFoundController,
};
