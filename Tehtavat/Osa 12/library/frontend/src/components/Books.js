import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const res = useQuery(ALL_BOOKS, {
    variables: {},
  })

  if (!props.show) {
    return null
  }

  let books = []

  if (!res.loading) {
    books = res.data.allBooks
  }

  const handleFilter = (event) => {
    event.preventDefault()
    res.refetch({ genre: event.target.genre.value })
  }

  return (
    <div>
      <h2>books</h2>
      <form onSubmit={handleFilter}>
        <input placeholder="genre" id="genre" />
        <button type="submit">filter</button>
      </form>
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
    </div>
  )
}

export default Books
