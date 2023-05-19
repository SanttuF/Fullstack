import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useUserValue } from '../contexts/UserContext'
import { useNotify } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'

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
    notifyWith(`Lked the blog '${blog.title}' by '${blog.author}'`)
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
        <a href={blog.url}> {blog.url}</a>{' '}
        <div>
          likes {blog.likes} <button onClick={like}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {canRemove && <button onClick={remove}>delete</button>}
      </div>

      <h4>Comments</h4>
      <CommentForm blog={blog} />
    </div>
  )
}

export default Blog
