const { Schema, model } = require("mongoose");

/**
 * The friend request schema is used to store the friend request.
 */

const FriendRequestSchema = new Schema({
  sender: {
    require: true,
    type: String,
  },
  receiver: {
    require: true,
    type: String,
  },
  timestamp: {
    require: true,
    type: Number,
  },
  status: {
    require: true,
    type: String,
    enum: ["approved", "rejected", "pending"],
  },
});

const FriendRequestModel = model("friendRequest", FriendRequestSchema);

module.exports = FriendRequestModel;
