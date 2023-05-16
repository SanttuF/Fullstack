import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        title:{' '}
        <input
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value)
          }}
          id="title"
        />{' '}
        <br />
        author:{' '}
        <input
          value={newAuthor}
          onChange={(event) => {
            setNewAuthor(event.target.value)
          }}
          id="author"
        />{' '}
        <br />
        url:{' '}
        <input
          value={newUrl}
          onChange={(event) => {
            setNewUrl(event.target.value)
          }}
          id="url"
        />{' '}
        <br />
        <button id="submit" type="submit">
          submit
        </button>
      </form>
    </>
  )
}
export default BlogForm
