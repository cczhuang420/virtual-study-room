const {Router} = require("express");
const PrivateRoomController = require("./privateRoom.controller");
const {payloadValidator} = require("../middlewares/payloadValidator");
const {queryValidator} = require("../middlewares/queryValidator");

const privateRoomController = new PrivateRoomController();

const router = Router({mergeParams: true})

//localhost:4000/api/privateRooms?owner=
//return an array which contain list of private rooms of an user


module.exports = router;