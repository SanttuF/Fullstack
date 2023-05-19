import { useQuery } from 'react-query'
import userServices from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const r = useQuery('users', userServices.getAll)

  if (r.isLoading) {
    return <div>loading</div>
  }

  const users = r.data

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} style={{ color: 'steelblue' }}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
