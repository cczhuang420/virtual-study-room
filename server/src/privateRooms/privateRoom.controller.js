const privateRoomModel = require("./privateRoom.model")

class PrivateRoomController {

  async getPrivateRooms(queryParam) {
    const filter = {}
    const fields = Object.keys(privateRoomModel.schema.obj)
    Object.entries(queryParam).forEach(([key, value]) => {
      if (fields.includes(key)) {
        filter[key] = value
      }
    })
    return privateRoomModel.find(filter);
  }

}

module.exports = PrivateRoomController
