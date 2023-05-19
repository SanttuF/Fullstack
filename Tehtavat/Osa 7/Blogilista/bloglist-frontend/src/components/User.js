import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import userServices from '../services/users'

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
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title} </li>
        ))}
      </ul>
    </>
  )
}

export default User
