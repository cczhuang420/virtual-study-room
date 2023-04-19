const { Router } = require("express");
const FriendController = require("./friend.controller");
const UserController = require("../users/user.controller");
const { queryValidator } = require("../middlewares/queryValidator");

const friendController = new FriendController();
const userController = new UserController();

const router = Router({ mergeParams: true });

//localhost:4000/api/friends?id=64389f264792028a18a6890b
//return an array which contain list of user object
router.get("/", [queryValidator(["id"])], async (req, res) => {
  const { id } = req.query;
  const user = userController.findById(id);
  if (user === null) {
    res.status(404).json("User not found");
  } else {
    res.json(await friendController.getAllFriends(id));
  }
});

//localhost:4000/api/friends?id=64389f264792028a18a6890b&fid=64389f454792028a18a68913
//return 204 if successful, it will remove the friend from both side
router.put("/", [queryValidator(["id", "fid"])], async (req, res) => {
  const { id, fid } = req.query;
  const user = await userController.findById(id);
  const friend = await userController.findById(fid);
  if (user === null || friend === null) {
    res.status(404).json("User or friend is not exist");
  } else if (!user.friends.includes(fid)) {
    res.status(409).json("The user does not have this friend");
  } else {
    await friendController.deleteFriend(id, fid);
    res.status(204).json();
  }
});

//send a request to add a friend
//localhost:4000/api/friends/requests?id=64389f264792028a18a6890b&fid=64389f454792028a18a68913
router.post("/requests", [queryValidator(["id", "fid"])], async (req, res) => {
  const { id, fid } = req.query;
  const user = await userController.findById(id);
  const friend = await userController.findById(fid);
  if (friend === null || user === null) {
    res.status(404).json("User is not exist");
  } else if (id === fid) {
    res.status(409).json("You can not send a request to yourself");
  } else if (await friendController.checkExistPendingRequest(id, fid)) {
    res
      .status(409)
      .json(
        "You have already send add friend request to this user or you have a pending request from this user"
      );
  } else if (user.friends.includes(fid)) {
    res.status(409).json("This user has already your friend");
  } else {
    await friendController.sendRequest(id, fid);
    res.status(201).json("send request successful");
  }
});

//get all users who send a add friend request to you, the request status must be pending
//localhost:4000/api/friends?id=64389f264792028a18a6890b
router.get("/requests", [queryValidator(["id"])], async (req, res) => {
  const { id } = req.query;
  const user = await userController.findById(id);
  if (user === null) {
    res.status(404).json("User is not exist");
  } else {
    res.json(await friendController.getAllSendRequestUser(id));
  }
});

//update the request status for the user, action will be the string, "approved" or "rejected"
//localhost:4000/api/friends/requests?id=64389f264792028a18a6890b&fid=64389f454792028a18a68913&action="approved"
//in here, the id is the receiver id, the fid is sender id.
router.put(
  "/requests",
  [queryValidator(["id", "fid", "action"])],
  async (req, res) => {
    const { id, fid, action } = req.query;
    const user = userController.findById(id);
    const friend = userController.findById(fid);
    if (user === null || friend === null) {
      res.status(404).json("The User is not exist");
    } else if (action !== "approved" && action !== "rejected") {
      res
        .status(409)
        .json(
          "the action must be a string, its value must be approved or rejected"
        );
    } else if (id === fid) {
      res.status(409).json("You can not process a request from yourself");
    } else if (
      !(await friendController.checkExistPendingRequestFromOneSide(id, fid))
    ) {
      res.status(409).json(`There are no pending request from ${fid} to ${id}`);
    } else {
      if (action === "approved") {
        await friendController.approvedRequest(id, fid);
        res.status(204).json();
      } else {
        await friendController.rejectedRequest(id, fid);
        res.status(204).json();
      }
    }
  }
);

module.exports = router;
