const privateRoomModel = require("./privateRoom.model")
const publicRoomModel = require("../publicRooms/publicRoom.model");

class PrivateRoomController {

  async getPrivateRooms(ownerId) {
    return privateRoomModel.find({ ownerId: ownerId })
  }
  async createPrivateRoom(ownerId, name, users, backgroundUrl, isVisibleToFriends) {
    return privateRoomModel.create({ownerId, name, users, backgroundUrl, isVisibleToFriends})
  }

}

module.exports = PrivateRoomController
