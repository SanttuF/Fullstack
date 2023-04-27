import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const [noti, setNoti] = useState(null)

  const notify = (message) => {
    setNoti(message)
    console.log(message)
    setTimeout(() => {
      setNoti(null)
    }, 3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async event => {
    event.preventDefault()
    const newBlog = {
      author: newAuthor,
      title: newTitle,
      ulr: newUrl
    }

    const rBlog = await blogService.create(newBlog)
    notify(`new blog ${newTitle} by ${newAuthor} added`)
    setBlogs(blogs.concat(rBlog))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
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
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  
  const showBlogs = () => (
    <>
      <h2> Blogs </h2>
      <p>{user.name} logged in! <button onClick={() => setUser(null) || window.localStorage.removeItem('loggedAppUser')}>logout</button></p>

      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        title: <input value={newTitle} onChange={event => {setNewTitle(event.target.value)}} /> <br/>
        author: <input value={newAuthor} onChange={event => {setNewAuthor(event.target.value)}} /> <br/>
        url: <input value={newUrl} onChange={event => {setNewUrl(event.target.value)}} /> <br/>
        <button type='submit'>submit</button>
        </form>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
      <Notification message={noti} />
      {!user && loginForm()}
      {user && showBlogs()}
    </div>
  )
}

export default App