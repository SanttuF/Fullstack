const { blog, blogs, brokenBlog } = require('./test_material/test_blogs')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  test('empty list equals 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test ('list with one blog equals it\'s likes', () => {
    expect(listHelper.totalLikes(blog)).toBe(4)
  })

  test('multiple blogs test', () => {
    expect(listHelper.totalLikes(blogs)).toBe(13)
  })

  test('with blog that has extra/missing fields', () => {
    expect(listHelper.totalLikes(brokenBlog)).toBe(3)
  })
})