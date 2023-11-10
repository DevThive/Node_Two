const express = require("express");
const router = express.Router();

const Products = require("../models/products_models.js");

// 모든 상품 리스트 조회하기
router.get("/products", async (req, res) => {
  const product = await Products.find({});
  res.send(product);
});

//상품 등록 (date, state 은 default를 이용)
router.post("/products/", async (req, res) => {
  const { Product_Name, Product, User_Name, Password } = req.body;

  const products = Products.find({ Product_Name });

  if (products.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsId입니다.",
    });
  }

  const createProducts = await Products.create({
    Product_Name,
    Product,
    User_Name,
    Password,
  });

  res.json({ products: createProducts });
});

module.exports = router;
