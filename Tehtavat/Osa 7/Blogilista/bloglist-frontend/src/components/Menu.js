import { Link } from 'react-router-dom'
import { useUserDispatch } from '../contexts/UserContext'
import storageService from '../services/storage'
import { useNotify } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const notifyWith = useNotify()

  const logout = async () => {
    userDispatch({ type: 'CLEAR_USER' })
    storageService.removeUser()
    notifyWith('logged out')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button to="/" component={Link}>
          blogs
        </Button>
        <Button to="/users" component={Link}>
          users
        </Button>
        <div style={{ marginLeft: 20 }}>
          {user.name} logged in
          <Button onClick={logout} variant="outlined" style={{ marginLeft: 5 }}>
            logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
