const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const users = require('./test_material/test_users')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('input validity tests', () => {
  test('cant add two users with same username', async () => {
    await api
      .post('/api/users')
      .send(users.validUser)
      .expect(201)

    const u = await api
      .post('/api/users')
      .send(users.validUser)
      .expect(400)
    expect(u.body.error).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `resu`')
  })

  test('invalid username', async () => {
    const u = await api
      .post('/api/users')
      .send(users.badUsernameUser)
      .expect(400)
    expect(u.body.error).toBe('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).')
  })

  test('invalid password', async () => {
    const u = await api
      .post('/api/users')
      .send(users.badPasswordUser)
      .expect(400)
    expect(u.body.error).toBe('password too short')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})