const Blog = require('./blog')
const ReadingList = require('./readingList')
const User = require('./user')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'reading_list' })

module.exports = {
  Blog, User, ReadingList, Session
}