import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

const title = 'test title'
const author = 'test author'
const url = 'test.url'

const createBlog = jest.fn()

test('form sends right information when creating a new blog entry', async () => {


  render(<CreateBlog createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  const fakeUser = userEvent.setup()

  await fakeUser.type(titleInput, title)
  await fakeUser.type(authorInput, author)
  await fakeUser.type(urlInput, url)

  const saveButton = screen.getByText('submit')

  await fakeUser.click(saveButton)

  expect(createBlog.mock.calls[0][0]).toEqual({ title, author, url })
})