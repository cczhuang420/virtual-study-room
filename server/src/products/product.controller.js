const productModel = require("./product.model")

class ProductController {

  async createProduct(name, type, price, url) {
    return await productModel.create({name, type, price, url})
  }

}

module.exports = ProductController
