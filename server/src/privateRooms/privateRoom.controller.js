const privateRoomModel = require("./privateRoom.model")

class PrivateRoomController {

  async getPrivateRooms(ownerId) {
    return privateRoomModel.find({ ownerId: ownerId })
  }
  async createPrivateRoom(ownerId, name, users, backgroundUrl, isVisibleToFriends) {
    return privateRoomModel.create({ ownerId, name, users, backgroundUrl, isVisibleToFriends })
  }

  async findById(id) {
    return privateRoomModel.findById(id)
  }

}

module.exports = PrivateRoomController
