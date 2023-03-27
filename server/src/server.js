const app = require("./app")

const PORT = process.env.PORT || 4000

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
  })
}

startServer()
