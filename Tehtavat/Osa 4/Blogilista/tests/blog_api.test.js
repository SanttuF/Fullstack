const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { blogs, blog } = require('./test_material/test_blogs')
const Blog = require('../models/blog')
const User = require('../models/user')
const { testUser } = require('./test_material/test_users')

const api = supertest(app)

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  // create test user and get the token
  if (!(await User.findOne({ username:test }))) {
    await api.post('/api/users').send(testUser)
  }
  token = (await api.post('/api/login')
    .send({ username: testUser.username, password: testUser.password })).body.token
  const b0 = blogs[0]
  b0.user = token.id
  const b1 = blogs[1]
  b1.user = token.id
  await Blog.insertMany([b0, b1])
})


describe('api returns', () => {
  test('all blogs get returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('api return all blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(2)
  })

  test('returned blogs have field "id"', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })
})

describe('test inputs', () => {
  test('can add new blogs with post', async () => {
    const test_blog = {
      title: 'z',
      author: 'x',
      url: 'z.x',
      likes: 235
    }

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(test_blog)
      .expect(201)

    const res = await api.get('/api/blogs')
    const urls = res.body.map(b => b.url)

    expect(res.body).toHaveLength(3)
    expect(urls).toContain(test_blog.url)
  })

  test('autofill likes if not given', async () => {
    await Blog.deleteMany({})
    const test_blog = {
      title: 'k',
      author: 'l',
      url: 'k.l',
    }

    await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
      .send(no_url)
      .expect(400)
  })

  test('doesnt accept request with no token', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })
})

describe('test change', () => {
  test('change amount likes', async () => {
    await Blog.deleteMany({})
    const id = (await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(blogs[0])).body.id
    const res = await api.put(`/api/blogs/${id}`).send({ ...blog[0], likes: 22 })
    expect(res.body.likes).toBe(22)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})