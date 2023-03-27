const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const userRouter = require("./routers/user.router")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)

app.get("/api/health", (_, res) => {
    res.json("OK")
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on ${process.env.PORT || 4000}`)
})
