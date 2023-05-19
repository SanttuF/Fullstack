import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { Button, TextField } from '@mui/material'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(blogService.comment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, comment],
      user: blog.user.id,
    }
    updateBlogMutation.mutate(updatedBlog)
    setComment('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="comment"
          value={comment}
          size="small"
          onChange={({ target }) => {
            setComment(target.value)
          }}
        />
        <Button type="submit" variant="contained">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentForm
