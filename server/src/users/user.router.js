const {Router} = require("express")
const UserController = require("./user.controller")
const {payloadValidator} = require("../middlewares/payloadValidator");

const userController = new UserController()

const router = Router({mergeParams: true})

router.post("/", async (req, res) => {
  res.json(
    await userController.createUser(req.body.email)
  )
})

router.get("/", async (req, res) => {
  res.json(
    await userController.getUser(req.query)
  )
})

router.get("/username-suggestion", async (req, res) => {
  res.json(
    await userController.getNameSuggestion(req.query.username)
  )
})

router.patch("/", [payloadValidator(["username"])], async (req, res) => {
  const filteredUsersPromise = userController.getUser(req.query)
  const userWithSameUsernamePromise = userController.getUser({username: req.body.username})
  const [filteredUsers, userWithSameUsername] = await Promise.all([
    filteredUsersPromise, userWithSameUsernamePromise
  ])
  if (filteredUsers.length === 0) {
    res.status(404).json("User not found")
  } else if (filteredUsers.length > 1) {
    res.status(409).json("No unique user with current query parameters")
  } else if (userWithSameUsername.length !== 0) {
    res.status(409).json("Username exists")
  } else {
    await userController.updateUsername(filteredUsers[0], req.body.username)
    res.status(204).json()
  }
})

module.exports = router
