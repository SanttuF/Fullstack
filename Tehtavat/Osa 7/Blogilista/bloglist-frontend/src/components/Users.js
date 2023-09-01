import { useQuery } from 'react-query'
import userServices from '../services/users'
import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const Users = () => {
  const r = useQuery('users', userServices.getAll)

  if (r.isLoading) {
    return <div>loading</div>
  }

  const users = r.data

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper} style={{ backgroundColor: 'darkgray' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ color: 'black', fontSize: 16 }}>
                <strong>Blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} style={{ color: 'steelblue' }}>
                    <strong>{user.name}</strong>
                  </Link>
                </TableCell>
                <TableCell style={{ color: 'black' }}>
                  <strong>{user.blogs.length}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
