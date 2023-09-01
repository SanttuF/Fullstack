const dummy = () => (1)

const totalLikes = blogs => (
  blogs.reduce((sum, blog) => sum + blog.likes, 0)
)

const favouriteBlog = blogs => (
  blogs.length === 0 ? null :
    blogs.reduce((m, b) => m.likes >= b.likes ? m : b, blogs[0])
)

const mostBlogs = blogs => {

  if (blogs.length === 0) { return null }

  const c = {}
  blogs.forEach(blog => {
    if (blog.author in c) {
      c[blog.author] += 1
    } else {
      c[blog.author] = 1
    }
  })

  let m = blogs[0].author
  for (let a in c) {
    if (c[a] > c[m]) {
      m = a
    }
  }

  return { author: m, blogs: c[m] }
}

const mostLikes = blogs => {

  if (blogs.length === 0) { return null }

  const c = {}
  blogs.forEach(blog => {
    if (blog.author in c) {
      c[blog.author] += blog.likes
    } else {
      c[blog.author] = blog.likes
    }
  })

  let m = blogs[0].author
  for (let a in c) {
    if (c[a] > c[m]) {
      m = a
    }
  }

  return { author: m, likes: c[m] }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
