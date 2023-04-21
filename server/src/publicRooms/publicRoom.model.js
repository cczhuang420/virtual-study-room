const {Schema, model} = require("mongoose")

const PublicRoomSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  users: {
    required: true,
    type: [String],
    default: []
  },
  playList: {
    required: true,
    type: [String],
    default: []
  },
  backgroundUrl: {
    required: true,
    type: String
  },
})

const PublicRoom = model("publicRoom", PublicRoomSchema)

module.exports = PublicRoom
