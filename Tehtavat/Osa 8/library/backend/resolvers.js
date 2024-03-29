const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let rBooks = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
        id: 1,
      })
      rBooks = !args.author
        ? rBooks
        : rBooks.filter((b) => b.author.name === args.author)
      rBooks = !args.genre
        ? rBooks
        : rBooks.filter((b) => b.genres.find((g) => g === args.genre))
      return rBooks
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      console.log(args)
      const user = await User.findOne({ username: args.username })
      console.log(user)

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 })
        try {
          await author.save()
        } catch (error) {
          throw (
            (new GraphQLError('saving author failed'),
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error,
              },
            })
          )
        }
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      await Author.updateOne({ name: author.name }, { $inc: { bookCount: 1 } })

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true }
        )
      } catch (error) {
        throw new GraphQLError('Changing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
