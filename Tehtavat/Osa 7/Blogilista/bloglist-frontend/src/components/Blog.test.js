import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'test.url',
  likes: 1,
  user: {
    name: 'test name',
    username: 'test username',
  },
}
const likeBlog = jest.fn()
const removeBlog = jest.fn()
const user = {}

test('render only title and author at first', () => {
  render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
  )

  screen.getByText('test title test author')
})

test('render all info after button press', async () => {
  render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
  )

  const fakeUser = userEvent.setup()
  const button = screen.getByText('view')
  await fakeUser.click(button)

  screen.getByText('test title test author test.url 1 test name')
})

test('like button works', async () => {
  render(
    <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
  )

  const fakeUser = userEvent.setup()
  const showButton = screen.getByText('view')
  await fakeUser.click(showButton)

  const likeButton = screen.getByText('like')
  await fakeUser.click(likeButton)
  await fakeUser.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)
})
