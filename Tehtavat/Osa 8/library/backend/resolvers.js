const Author = require('./models/author')
const Book = require('./models/book')

const resolvers = {
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },
  // Book: {
  //   author: (root) =>
  // }
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({})
      // let rBooks = !args.author
      //   ? books
      //   : books.filter((b) => b.author === args.author)
      // rBooks = !args.genre
      //   ? rBooks
      //   : rBooks.filter((b) => b.genres.find((g) => g === args.genre))
      // return rBooks
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = (await Author.find({ name: args.author }))[0]
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author })
      return book.save()
    },

    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }
      const newAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name !== newAuthor.name ? a : newAuthor))
      return newAuthor
    },
  },
}

module.exports = resolvers
