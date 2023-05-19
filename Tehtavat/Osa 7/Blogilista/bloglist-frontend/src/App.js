import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import storageService from './services/storage'

import { useUserDispatch, useUserValue } from './contexts/UserContext'

import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { Container, Paper, ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

const App = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const user = storageService.loadUser()
    userDispatch({ type: 'SET_USER', payload: user })
  }, [])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  if (!user) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container
          component={Paper}
          style={{ paddingTop: 20, paddingBottom: 50 }}
        >
          <Notification />
          <LoginForm />
        </Container>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component={Paper} style={{ paddingBottom: 50 }}>
        <Menu />
        <Notification />
        <h1>Blog app</h1>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
