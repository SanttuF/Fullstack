const jwt = require('jsonwebtoken')

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name ==='CastError') {
    return res.status(400).json({ error:'invalid id' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' })
  } else if (error.message === 'password too short') {
    return res.status(400).json({ error: error.message })
  } else if (error.message === 'invalid username') {
    return res.status(401).json({ error: error.message })
  } else if (error.message === 'wrong password') {
    return res.status(401).json({ error: error.message })
  } else if (error.message === 'invalid token') {
    return res.status(401).json({ error:error.message })
  } else if (error.message === 'wrong user') {
    return res.status(401).json({ error:'no permissions' })
  }

  console.log(`error not caught: ${error}`)
  next(error)
}

const tokenExtractor = (req, res, next) =>  {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) { throw Error('invalid token') }
  req.user = decodedToken.id
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }