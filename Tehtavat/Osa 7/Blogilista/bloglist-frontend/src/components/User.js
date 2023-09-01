import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import userServices from '../services/users'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

const User = () => {
  const r = useQuery('users', userServices.getAll)
  const id = useParams().id

  if (r.isLoading) {
    return <div>loading</div>
  }

  const users = r.data
  const user = users.find((u) => u.id === id)

  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <TableContainer component={Paper} style={{ backgroundColor: 'darkgray' }}>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`} style={{ color: 'steelblue' }}>
                    <strong>
                      {blog.title} {blog.author}
                    </strong>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default User
