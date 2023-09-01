import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}

const addAnecdote = async content => {
  const object = {content, votes:0}
  return (await axios.post(baseUrl, object)).data
}

const changeAnecdote = async anecdote => {
  return (await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)).data
}

const rObject = { getAll, addAnecdote, changeAnecdote }
export default rObject