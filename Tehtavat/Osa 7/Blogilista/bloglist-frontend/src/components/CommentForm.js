import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'

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
        <input
          id="comment"
          placeholder="comment"
          value={comment}
          onChange={({ target }) => {
            setComment(target.value)
          }}
        />
        <button type="submit">add comment</button>
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
