const userModel = require("./user.model")
const { colors, adjectives, uniqueNamesGenerator, animals } = require("unique-names-generator")

class UserController {

  async findById(id) {
    return userModel.findById(id);
  }

  async createUser(email, username) {
    return await userModel.create({email, username})
  }

  async getUser(queryParam) {
    const filter = {}
    const fields = Object.keys(userModel.schema.obj)
    Object.entries(queryParam).forEach(([key, value]) => {
      if (fields.includes(key) || key === "_id") {
        filter[key] = value
      }
    })
    return userModel.find(filter);
  }

  async updateUsername(userDoc, username) {
    userDoc.username = username
    await userDoc.save()
  }

  async getNameSuggestion(name) {
    const generateRandomName = name ? (
        base => base + Array.from({length: 5}, () => Math.round(Math.random() * 10)).join("")
      ) : (
        () => uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          length: 3,
          style: "capital",
          separator: " "
        })
      )

    let username;
    do {
      username = generateRandomName(name);
    } while(await userModel.exists({username}))

    return username
  }

  async purchaseAsset(userDoc, assetId) {
    if (!userDoc.assets.includes(assetId)) {
      userDoc.assets.push(assetId)
    }
    userDoc.save()
  }

}

module.exports = UserController
