const {Router} = require("express")
const FriendController = require("./friend.controller")
const UserController = require("../users/user.controller")
const {queryValidator} = require("../middlewares/queryValidator")
const {payloadValidator} = require("../middlewares/payloadValidator")

const friendController = new FriendController()
const userController = new UserController()

const router = Router({mergeParams: true})

router.get("/",[queryValidator(["id"])], async (req,res) =>{
     const {id} = req.query
     const user = userController.findById(id)
     if(user === null){
         res.status(404).json("User not found")
     }else{
         res.json(await friendController.getAllFriends(id))
     }
})

router.put("/", [queryValidator(["id","fid"])], async (req,res)=>{
     const {id,fid} = req.query
     const user = await userController.findById(id)
     const friend = await userController.findById(fid)
     if(user === null || friend === null){
         res.status(404).json("User or friend is not exist")
     }else if(!user.friends.includes(fid)){
         res.status(409).json("The user does not have this friend")
     }else{
         await friendController.deleteFriend(id,fid)
         res.status(204).json()
     }
})


module.exports = router