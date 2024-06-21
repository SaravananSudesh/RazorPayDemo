const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

//Import routes
const routes = require('./routes.js')

//Configure routes
app.use('/api', routes)

const port = 3000

app.listen(port, () => console.log(`Server is running at ${port} !`))