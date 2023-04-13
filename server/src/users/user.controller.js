const userModel = require("./user.model")

class UserController {

  async createUser(email, username) {
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

  async getNameSuggestion(name) {
    if (name) {
      let randNum;
      do {
        randNum = Array.from({length: 5}, () => Math.round(Math.random() * 10)).join("")
      } while(await userModel.exists({username: name + randNum}));
      return name + randNum
    } else {

    }
  }

}

module.exports = UserController
