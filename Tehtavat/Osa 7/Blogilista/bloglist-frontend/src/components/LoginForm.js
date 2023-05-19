import { useState } from 'react'

import loginService from '../services/login'
import storageService from '../services/storage'

import { useUserDispatch } from '../contexts/UserContext'
import { useNotify } from '../contexts/NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userDispatch = useUserDispatch()
  const notifyWith = useNotify()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      userDispatch({ type: 'SET_USER', payload: user })
      storageService.saveUser(user)
      notifyWith(`Welcome ${user.name}`, 'success')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
