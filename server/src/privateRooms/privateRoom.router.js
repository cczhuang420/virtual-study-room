const { Router } = require("express");
const PrivateRoomController = require("./privateRoom.controller");
const { payloadValidator } = require("../middlewares/payloadValidator");
const { queryValidator } = require("../middlewares/queryValidator");

const privateRoomController = new PrivateRoomController();

const router = Router({ mergeParams: true })

//localhost:4000/api/privateRooms?owner=
//return an array which contain list of private rooms of an user

router.get("/", [queryValidator(["owner"])], async (req, res) => {
    res.json(
        await privateRoomController.getPrivateRooms(req.query.owner)
    )
})

router.post("/", payloadValidator(["ownerId", "name", "users", "backgroundUrl", "isVisibleToFriends"]), async (req, res) => {
    const { ownerId, name, users, backgroundUrl, isVisibleToFriends } = req.body;
    res.json(
        await privateRoomController.createPrivateRoom(ownerId, name, users, backgroundUrl, isVisibleToFriends)
    )
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    res.json(await privateRoomController.findById(id))
})


module.exports = router;
