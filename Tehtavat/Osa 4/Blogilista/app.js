const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const { errorHandler, tokenExtractor } = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app