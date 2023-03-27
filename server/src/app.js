const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

const connectionString = process.env.MONGO_URL
mongoose.connect(connectionString)

const userRouter = require("./routers/user.router")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)

app.get("/api/health", (_, res) => {
    res.json("OK")
})

module.exports = app
