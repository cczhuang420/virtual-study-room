const userModel = require("../models/user.model")

class UserController {

  async createUser(nickname, email) {
    const plainText = `${+new Date()}${Math.random()}`
    const username = Buffer.from(plainText).toString("base64")
    await userModel.create({nickname, email, username})
    return await userModel.create({nickname, email, username})
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

}

module.exports = UserController
