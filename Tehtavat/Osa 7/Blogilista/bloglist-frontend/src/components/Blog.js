import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useUserValue } from '../contexts/UserContext'
import { useNotify } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'
import { Button } from '@mui/material'

const Blog = () => {
  const notifyWith = useNotify()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useUserValue()
  const id = useParams().id
  const r = useQuery('blogs', blogService.getAll)

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  if (r.isLoading) {
    return <div>loading</div>
  }

  const blog = r.data.find((b) => b.id === id)

  const like = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    updateBlogMutation.mutate(blogToUpdate)
    notifyWith(`Lked the blog '${blog.title}' by '${blog.author}'`, 'success')
  }

  const remove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      removeBlogMutation.mutate(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      navigate('/')
    }
  }

  const canRemove = () => user.id === blog.user.id

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url} style={{ color: 'steelblue' }}>
          {blog.url}
        </a>
        <p>
          likes {blog.likes}{' '}
          <Button variant="outlined" onClick={like}>
            like
          </Button>
        </p>
        <p>added by {blog.user.name}</p>
        {canRemove && (
          <Button onClick={remove} variant="contained">
            delete
          </Button>
        )}
      </div>

      <h4>Comments</h4>
      <CommentForm blog={blog} />
    </div>
  )
}

export default Blog
