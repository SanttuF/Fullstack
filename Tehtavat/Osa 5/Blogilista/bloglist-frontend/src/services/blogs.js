import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const like = async blog => {
  blog.likes += 1
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return res.data.likes
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  axios.delete(`${baseUrl}/${blog.id}`, config)
}


export default { setToken, getAll, create, like, remove }