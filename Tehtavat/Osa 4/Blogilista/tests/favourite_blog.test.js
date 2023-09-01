const { blog, blogs, brokenBlog } = require('./test_material/test_blogs')
const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
  test('empty list equals null', () => {
    expect(listHelper.favouriteBlog([])).toBe(null)
  })

  test('list with single blog returns it', () => {
    expect(listHelper.favouriteBlog(blog)).toEqual(blog[0])
  })

  test('return most liked from a list of many blogs', () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[0])
  })

  test('blogs with extra fields work too', () => {
    expect(listHelper.favouriteBlog(brokenBlog)).toEqual(brokenBlog[0])
  })
})