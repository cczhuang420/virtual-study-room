const {Router} = require("express")
const UserController = require("./user.controller")

const userController = new UserController()

const router = Router({mergeParams: true})

router.post("/", async (req, res) => {
  res.json(
    await userController.createUser(req.body.email, req.body.username)
  )
})

router.get("/", async (req, res) => {
  res.json(
    await userController.getUser(req.query)
  )
})

module.exports = router
