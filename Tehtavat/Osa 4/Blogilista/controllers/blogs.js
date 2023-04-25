const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}).populate('user', { username:1, name:1 }))
})


blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})


blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)


  if (!(blog.user.toString() === request.user.toString())) { throw Error('wrong user')}

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {
  const uBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators:true, context: 'query' })
  response.json(uBlog)
})

module.exports = blogRouter