import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const SetBirthyear = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const res = useQuery(ALL_AUTHORS)

  let authors = []

  if (!res.loading) {
    authors = res.data.allAuthors
  }

  const updateAuthor = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(year) } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option value={a.name} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default SetBirthyear
