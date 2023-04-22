const publicRoomModel = require("./publicRoom.model")

class PublicRoomController {

  async getAllPublicRooms() {
    return publicRoomModel.find()
  }

  async createPublicRoom(name, users, playList, backgroundUrl) {
    return await publicRoomModel.create({name, users, playList, backgroundUrl})
  }

}

module.exports = PublicRoomController
