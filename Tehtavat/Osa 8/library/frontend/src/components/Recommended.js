import { ALL_BOOKS, USER } from '../queries'
import { useQuery } from '@apollo/client'

const Recommended = (props) => {
  const user = useQuery(USER)

  const skip = user.data === undefined
  const variables = skip ? {} : { genre: user.data.me.favoriteGenre }
  const bookRes = useQuery(ALL_BOOKS, {
    skip,
    variables,
  })

  if (!props.show) {
    return null
  }

  let books = []

  if (!(user.loading || bookRes.loading)) {
    books = bookRes.data.allBooks
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommended
