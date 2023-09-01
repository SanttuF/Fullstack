import NewBlog from './NewBlog'
import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Blogs = () => {
  const result = useQuery('blogs', blogService.getAll)

  if (result.isLoading) {
    return <div>loading blogs...</div>
  }

  const blogs = result.data

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
      <h2>logs</h2>
      <NewBlog />
      <TableContainer component={Paper} style={{ backgroundColor: 'darkgray' }}>
        <Table>
          <TableBody>
            {blogs.sort(byLikes).map((blog) => (
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

export default Blogs
