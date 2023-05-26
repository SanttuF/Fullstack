import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data }] = useMutation(LOGIN)

  useEffect(() => {
    if (!data) {
      return
    }
    const token = data.login.value
    setToken(token)
    localStorage.setItem('library-user', token)
  }, [data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm
