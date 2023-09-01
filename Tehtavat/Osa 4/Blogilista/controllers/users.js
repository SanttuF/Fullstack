const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (req, res) => {
  res.json(await User.find({}).populate('blogs', { url:1,title:1,author:1,id:1 }))
})

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  // test password
  if (password.length < 3) {
    throw Error('password too short')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const rUser = await user.save()
  res.status(201).json(rUser)
  console.log(`User "${username}" created`)
})

module.exports = userRouter