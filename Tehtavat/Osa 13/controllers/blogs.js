const router = require('express').Router()

const { Blog, User } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where: {
      [Op.or]: [
        { 
          title: {
            [Op.substring]: req.query.search ? req.query.search : ''
          }
        },
        {
          author: {
            [Op.substring]: req.query.search ? req.query.search : ''
          }
        }
      ]
    },
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({...req.body, userId: req.decodedToken.id})
  return res.json(blog)
})

router.delete('/:id',tokenExtractor, async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findByPk(id)
  if (blog.userId !== req.decodedToken.userId) throw new Error("Can only delete own blogs")
  if (blog) {
    await blog.destroy()
  }
  res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findByPk(id)
  blog.likes = req.body.likes
  if (!blog.likes) {
    throw new Error('Invalid attributes')
  }
  await blog.save()
  res.json(blog)
})

module.exports = router