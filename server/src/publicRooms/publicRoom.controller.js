const publicRoomModel = require("./publicRoom.model")

class PublicRoomController {

  async getAllPublicRooms() {
    return publicRoomModel.find()
  }

  async getPublicRoom(id) {
    return publicRoomModel.findById(id)
  }

  async createPublicRoom(name, users, playList, backgroundUrl) {
    return await publicRoomModel.create({name, users, playList, backgroundUrl})
  }

}

module.exports = PublicRoomController
