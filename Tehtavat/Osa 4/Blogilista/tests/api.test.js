const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { blogs, blog } = require('./test_material/test_blogs')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})


test('all blogs get returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('api return all blogs', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(blogs.length)
})

test('returned blogs have field "id"', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

test('can add new blogs with post', async () => {
  const test_blog = {
    title: 'z',
    author: 'x',
    url: 'z.x',
    likes: 235
  }

  await api.post('/api/blogs')
    .send(test_blog)
    .expect(201)

  const res = await api.get('/api/blogs')
  const urls = res.body.map(b => b.url)

  expect(res.body).toHaveLength(blogs.length + 1)
  expect(urls).toContain(test_blog.url)
})

describe('test inputs', () =>{
  test('autofill likes if not given', async () => {
    await Blog.deleteMany({})
    const test_blog = {
      title: 'k',
      author: 'l',
      url: 'k.l',
    }

    await api.post('/api/blogs')
      .send(test_blog)
      .expect(201)

    const res = await api.get('/api/blogs')
    expect(res.body[0].likes).toBe(0)
  })

  test('return "bad request" if no title', async () => {

    const no_title = {
      author: 'a',
      url: 'b',
      likes:10
    }

    await api.post('/api/blogs')
      .send(no_title)
      .expect(400)
  })

  test('return "bad request" if no url', async () => {

    const no_url = {
      title: 'c',
      author: 'd',
      likes: 10
    }

    await api.post('/api/blogs')
      .send(no_url)
      .expect(400)
  })
})

test('delete removes the entry', async () => {
  await Blog.deleteMany({})
  const id = (await api.post('/api/blogs').send(blogs[0])).body.id
  await api.delete(`/api/blogs/${id}`)
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(0)
})

describe('test put api', () => {
  test('change amount likes', async () => {
    await Blog.deleteMany({})
    const id = (await api.post('/api/blogs').send(blogs[0])).body.id
    const res = await api.put(`/api/blogs/${id}`).send({ ...blog[0], likes: 22 })
    expect(res.body.likes).toBe(22)
  })

})




afterAll(async () => {
  await mongoose.connection.close()
})