const {Router} = require("express")
const UserController = require("../controllers/user.controller")

const userController = new UserController()

const router = Router({mergeParams: true})

router.post("/", async (req, res) => {
  res.json(
    await userController.createUser(req.body.nickname, req.body.email)
  )
})

router.get("/", async (req, res) => {
  res.json(
    req.query
  )
})

module.exports = router
