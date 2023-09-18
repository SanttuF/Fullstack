const router = require('express').Router()
const {  Session } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')

router.delete('/', tokenExtractor, async (request, response) => {
  const a = await Session.destroy({where: {username: request.decodedToken.username}})
  console.log(a)
  response.status(204).end()
})

module.exports = router