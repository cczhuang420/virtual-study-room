const { Router } = require("express");
const ProductController = require("./product.controller");
const { payloadValidator } = require("../middlewares/payloadValidator");
const { queryValidator } = require("../middlewares/queryValidator");

const productTypes = ["background", "music", "profile-image"];

const productController = new ProductController();

const router = Router({ mergeParams: true });

router.get("/", [queryValidator(["type"])], async (req, res) => {
  if (!productTypes.includes(req.query.type)) {
    res
      .status(400)
      .json(
        `Invalid type: product must be of type [${productTypes.join(", ")}]`
      );
  } else {
    res.json(await productController.findProductsByType(req.query.type));
  }
});

router.post(
  "/",
  [payloadValidator(["name", "type", "price"])],
  async (req, res) => {
    const price = Number(req.body.price);
    if (!productTypes.includes(req.body.type)) {
      res
        .status(400)
        .json(
          `Invalid type: product must be of type [${productTypes.join(", ")}]`
        );
    } else if (isNaN(price) || price < 0) {
      res
        .status(400)
        .json("Invalid price: product price must be non-negative integer");
    } else {
      await productController.createProduct(
        req.body.name,
        req.body.type,
        price,
        req.body.url
      );
      res.status(201).json();
    }
  }
);

router.post(
  "/purchase",
  [queryValidator(["userId", "productId"])],
  async (req, res) => {
    const { userId, productId } = req.query;
    const user = await productController.findUserById(userId);
    const product = await productController.findProductById(productId);
    if (user.coins < product.price) {
      res.status(400).json("You don't have enough coins");
    } else {
      await productController.purchaseProduct(productId, userId);
      res.status(204).json("purchase successfully");
    }
  }
);

module.exports = router;
