import { Link } from 'react-router-dom'
import { useUserDispatch } from '../contexts/UserContext'
import storageService from '../services/storage'
import { useNotify } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'
import { Paper } from '@mui/material'

const Menu = () => {
  const pad = {
    padding: 5,
    color: 'steelblue',
  }
  const borderStyle = {
    padding: 5,
    marginBottom: 10,
  }

  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const notifyWith = useNotify()

  const logout = async () => {
    userDispatch({ type: 'CLEAR_USER' })
    storageService.removeUser()
    notifyWith('logged out')
  }

  return (
    <Paper style={borderStyle} elevation={8}>
      <Link to="/" style={pad}>
        blogs
      </Link>
      <Link to="/users" style={pad}>
        users
      </Link>
      <>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </>
    </Paper>
  )
}

export default Menu
