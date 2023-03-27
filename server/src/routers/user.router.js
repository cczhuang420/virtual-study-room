const {Router} = require("express")
const UserController = require("../controllers/user.controller")

const userController = new UserController()

const router = Router({mergeParams: true})

router.post("/", (req, res) => {
  res.json("Hello")
})

module.exports = router
