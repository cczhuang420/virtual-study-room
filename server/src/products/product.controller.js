const productModel = require("./product.model");
const userModel = require("../users/user.model");

class ProductController {
  async findProductsByType(type) {
    return productModel.find({ type });
  }

  async createProduct(name, type, price, url) {
    return await productModel.create({ name, type, price, url });
  }

  async findProductById(productId) {
    return productModel.findById(productId);
  }

  async findUserById(userId) {
    return userModel.findById(userId);
  }

  async purchaseProduct(productId, userId) {
    const user = await this.findUserById(userId);
    const product = await this.findProductById(productId);
    await userModel.updateOne(
      {
        _id: userId,
      },
      { $push: { assets: productId }, $inc: { coins: -product.price } }
    );
  }
}

module.exports = ProductController;
