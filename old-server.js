const express = require("express");
const app = express();
const path = require("path");
const fsPromises = require("fs").promises;
const { products } = require("./model/data");
const logger = require("./logger");

const PORT = 5000;

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/products", (req, res) => {
  const newProuducts = products.map((product) => {
    const { name, id } = product;
    return { name, id };
  });
  res.json(newProuducts);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  res.status(200).json(sortedProducts);
});

app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (single) => single.id === Number(productID)
  );
  res.json(singleProduct);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
