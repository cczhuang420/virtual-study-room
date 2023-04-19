
const friendRequestModel = require("./friend.model")
const userModel = require("../users/user.model")

class FriendController{
     //get friend list of the user
     //input is the objectId of user
     async getAllFriends(id){
         const user = await userModel.findById(id)
         const friendIds = user.friends
         const allFriends = []
         if(friendIds === null || friendIds.length === 0) {
             return allFriends
         }else{
             for(let friendId of friendIds){
                  const friend = await userModel.findById(friendId)
                  if(friend !== null && !allFriends.includes(friend)){
                      allFriends.push(friend)
                  }
             }
             return allFriends
         }
     }

     async deleteFriend(myId,friendId){
         await userModel.updateOne({_id:myId}, { $pull: { friends: friendId } });
         await userModel.updateOne({_id:friendId},{$pull: { friends: myId } });
     }

}

module.exports = FriendController