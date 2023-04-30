const userModel = require("./user.model");
const productModel = require("../products/product.model");
const {
  colors,
  adjectives,
  uniqueNamesGenerator,
  animals,
} = require("unique-names-generator");

class UserController {
  async findById(id) {
    return userModel.findById(id);
  }

  async createUser(email, username) {
    return await userModel.create({ email, username });
  }

  async getUser(queryParam) {
    const filter = {};
    const fields = Object.keys(userModel.schema.obj);
    Object.entries(queryParam).forEach(([key, value]) => {
      if (fields.includes(key) || key === "_id") {
        filter[key] = value;
      }
    });
    return userModel.find(filter);
  }

  async getNameSuggestion(name) {
    const generateRandomName = name
      ? (base) =>
          base +
          Array.from({ length: 5 }, () => Math.round(Math.random() * 10)).join(
            ""
          )
      : () =>
          uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            length: 3,
            style: "capital",
            separator: " ",
          });

    let username;
    do {
      username = generateRandomName(name);
    } while (await userModel.exists({ username }));

    return username;
  }

  async findProductById(productId) {
    return productModel.findById(productId);
  }

  async purchaseProduct(productId, userId) {
    const user = await this.findById(userId);
    const product = await this.findProductById(productId);
    await userModel.updateOne(
      {
        _id: userId,
      },
      { $push: { assets: productId }, $inc: { coins: -product.price } }
    );
  }

  async checkExistProduct(productId, userId) {
    const user = await userModel.findById(userId);
    return user.assets.includes(productId);
  }

  async findUserProductByType(userId, type) {
    const user = await this.findById(userId);
    let assets = [];
    for (let productId of user.assets) {
      const data = await this.findProductById(productId);
      assets.push(data);
    }
    return assets.filter((it) => it.type === type);
  }

  async updateName(userId, name) {
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        username: name,
      }
    );
  }

  async updateProfileImage(userId, url) {
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        profile: url,
      }
    );
  }
}

module.exports = UserController;
