const { blog, blogs } = require('./test_material/test_blogs')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  test('empty list equals null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('list with single', () => {
    expect(listHelper.mostBlogs(blog)).toEqual({ author: 'q', blogs: 1 })
  })

  test('list with multiple blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'w', blogs: 2 })
  })
})