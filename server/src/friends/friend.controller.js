const friendRequestModel = require("./friend.model");
const userModel = require("../users/user.model");

class FriendController {
  //get friend list of the user
  //input is the objectId of user
  async getAllFriends(id) {
    const user = await userModel.findById(id);
    const friendIds = user.friends;
    const allFriends = [];
    if (friendIds === null || friendIds.length === 0) {
      return allFriends;
    } else {
      for (let friendId of friendIds) {
        const friend = await userModel.findById(friendId);
        if (friend !== null && !allFriends.includes(friend)) {
          allFriends.push(friend);
        }
      }
      return allFriends;
    }
  }

  //two user id
  async deleteFriend(myId, friendId) {
    await userModel.updateOne({ _id: myId }, { $pull: { friends: friendId } });
    await userModel.updateOne({ _id: friendId }, { $pull: { friends: myId } });
  }

  async sendRequest(id, fid) {
    await friendRequestModel.create({
      sender: id,
      receiver: fid,
      timestamp: Math.floor(Date.now() / 1000),
      status: "pending",
    });
  }

  async getAllSendRequestUser(id) {
    const requests = await friendRequestModel.find({ receiver: id });
    const sendRequestUsers = [];
    for (let request of requests) {
      const user = await userModel.findById(request.sender);
      if (user !== null && request.status === "pending") {
        sendRequestUsers.push(user);
      }
    }
    return sendRequestUsers;
  }
}

module.exports = FriendController;
