const {Router} = require("express")
const UserController = require("./user.controller")
const {payloadValidator} = require("../middlewares/payloadValidator");
const {queryValidator} = require("../middlewares/queryValidator")

const userController = new UserController()

const router = Router({mergeParams: true})

router.post("/", payloadValidator(["username", "email"]), async (req, res) => {
  res.json(
    await userController.createUser(req.body.email, req.body.username)
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

router.post("/asset", [queryValidator(["userId", "productId"])], async (req, res) => {
  const user = await userController.findById(req.query.userId)
  if (!user) {
    res.status(404).json("User not found")
  } else {
    await userController.purchaseAsset(user, req.query.productId)
    res.status(201).json()
  }
})

router.post("/todo", [queryValidator(["userId"]), payloadValidator(["content"])], async (req, res) => {
  const user = await userController.findById(req.query.userId)
  if (!user) {
    res.status(404).json("User not found")
  } else {
    await userController.addTodo(user, req.body.content)
    res.status(201).json()
  }
})

router.patch("/todo/toggle", [queryValidator(["userId"]), payloadValidator(["content"])], async (req, res) => {
  const user = await userController.findById(req.query.userId)
  if (!user) {
    res.status(404).json("User not found")
  } else {
    await userController.toggleTodo(user, req.body.content)
    res.status(201).json()
  }
})

module.exports = router
