const Blog = require('../models/blog')
const { blogs } = require('./test_material/test_blogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  await  Promise.all(blogs.map(blog => (new Blog(blog)).save()))
})

module.exports = { beforeEach }