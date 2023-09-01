const { blog, blogs } = require('./test_material/test_blogs')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  test('empty list equals null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('list with single', () => {
    expect(listHelper.mostLikes(blog)).toEqual({ author: 'q', likes: 4 })
  })

  test('list with multiple blogs', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'w', likes: 11 })
  })
})