const userModel = require("./user.model")

class UserController {

  async createUser(email) {
    const plainText = `${+new Date()}${Math.random()}`
    const username = Buffer.from(plainText).toString("base64")
    return await userModel.create({email, username})
  }

  async getUser(queryParam) {
    const filter = {}
    const fields = Object.keys(userModel.schema.obj)
    Object.entries(queryParam).forEach(([key, value]) => {
      if (fields.includes(key)) {
        filter[key] = value
      }
    })
    return userModel.find(filter);
  }

  async updateUsername(userDoc, username) {
    userDoc.username = username
    await userDoc.save()
  }

}

module.exports = UserController
