const express = require("express");
const products = require("../data/products");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, products });
});

router.get("/:id", (req, res) => {
  const product = products.find(item => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }

  res.json({ success: true, product });
});

module.exports = router;