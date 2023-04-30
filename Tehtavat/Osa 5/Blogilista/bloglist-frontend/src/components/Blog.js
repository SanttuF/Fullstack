import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, reload, removeBlog, user }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    reload: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const [showAll, setShowAll] = useState(false)

  const likeBlog = async () => {
    blog.likes = await blogService.like(blog)
    reload()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showAll) { return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button onClick={() => setShowAll(false)}>hide</button> <br />
      {blog.url} <br />
      {blog.likes}
      <button onClick={likeBlog}>like</button> <br />
      {blog.user.name} <br />
      {user.username === blog.user.username &&
      <button onClick={() => removeBlog(blog)}>remove</button>}
    </div>
  )}

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button onClick={() => setShowAll(true)}>view</button>
    </div>
  )

}

export default Blog