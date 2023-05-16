import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogs from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [noti, setNoti] = useState(null)

  const [r, setReload] = useState(false)
  const reload = () => {
    setReload(!r)
  }

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message) => {
    setNoti(message)
    console.log('notification:', message)
    setTimeout(() => {
      setNoti(null)
    }, 3000)
  }

  const addBlog = async (newBlog) => {
    const rBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(rBlog))
    notify(`new blog ${newBlog.title} by ${newBlog.author} added`)
    blogFormRef.current.toggleVisibility()
  }

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog "${blog.title}"`)) {
      return
    }
    await blogService.remove(blog)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
    notify(`blog ${blog.title} has been removed`)
  }

  const likeBlog = async (blog) => {
    blog.likes = await blogService.like(blog)
    reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      notify(`logged in as ${user.name}`)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password')
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">
        login
      </button>
    </form>
  )

  return (
    <div>
      <Notification message={noti} />

      {!user && loginForm()}

      {user && (
        <>
          <h2>Blogs</h2>

          <p>
            {user.name} logged in
            <button
              onClick={() =>
                setUser(null) || window.localStorage.removeItem('loggedAppUser')
              }
            >
              logout
            </button>
          </p>

          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <CreateBlogs createBlog={addBlog} />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                removeBlog={removeBlog}
                likeBlog={likeBlog}
                user={user}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
