require('dotenv').config()
const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})