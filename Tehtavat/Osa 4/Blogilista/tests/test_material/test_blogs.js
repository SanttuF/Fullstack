const blog = [{
  title: 'a',
  author: 'q',
  url: 'a.q',
  likes: 4
}]

const blogs = [{
  title: 'b',
  author: 'w',
  url: 'b.w',
  likes: 8
},
{
  title: 'c',
  author: 'e',
  url: 'c.e',
  likes: 0
},
{
  title: 'd',
  author: 'r',
  url: 'd.r',
  likes: 2
},
{
  title: 'e',
  author: 'w',
  url: 'e.t',
  likes: 3
}]

const brokenBlog = [{
  abc: 'asd',
  author: 'cde',
  likes: 3,
  _id: 1232145
}]

module.exports = {
  blog,
  blogs,
  brokenBlog
}