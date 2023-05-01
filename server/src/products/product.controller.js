const productModel = require("./product.model");
const userModel = require("../users/user.model");

class ProductController {
  async findProductsByType(type) {
    return productModel.find({ type });
  }

  async createProduct(name, type, price, url) {
    return await productModel.create({ name, type, price, url });
  }
}

module.exports = ProductController;
