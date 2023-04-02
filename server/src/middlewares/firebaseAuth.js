const {auth} = require("../firebase")

const firebaseAuth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "")
  try {
    req.user = await auth.verifyIdToken(token)
    next()
  } catch (e) {
    res.status(401).json("Invalid JWT Token")
  }
}

module.exports.firebaseAuth = firebaseAuth
