import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'
import Togglable from './Togglable'

import { Button, TextField } from '@mui/material'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const notifyWith = useNotify()
  const blogFormRef = useRef()

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const style = {
    margin: 7,
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
    notifyWith(`A new blog '${title}' by '${author}' added`, 'success')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h4>Create a new blog</h4>

        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="title"
              placeholder="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <TextField
              id="author"
              placeholder="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <TextField
              id="url"
              placeholder="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button type="submit" variant="contained" style={style}>
            create
          </Button>
          <Button
            type="button"
            variant="contained"
            style={style}
            onClick={() => blogFormRef.current.toggleVisibility()}
          >
            cancel
          </Button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm
