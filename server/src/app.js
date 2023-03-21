const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_, res) => {
    res.json("OK")
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on ${process.env.PORT || 4000}`)
})
