const router = require('express').Router()

const { Op } = require('sequelize')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      }
    ]
  })
  res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({where: {username: req.params.username}})
  if (!user) {
    throw new Error('Invalid parameter')
  }
  await user.update({username: req.body.username})
  res.status(200).json(user)
})

router.get('/:id', async (req, res) => {
  where = {}
  
  if (req.query.read) {
    where.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    attributes: {exclude: ['createdAt', 'updatedAt']},
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
      },
      {
        model: Blog,
        as: 'reading_list',
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          attributes: ['id', 'read'],
          where
        },
      }
    ]
  })
  res.status(200).json(user)
})

module.exports = router