const router = require('express').Router()
const { ReadingList } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')

router.post('/', async (req, res) => {
  const rList = await ReadingList.create({userId: req.body.userId, blogId: req.body.blogId})
  res.status(201).json(rList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)

  if(req.decodedToken.id !== readingList.userId) {
    throw new Error('Can edit only own reading list')
  }

  readingList.read = req.body.read

  await readingList.save()

  res.status(200).json(readingList)
})

module.exports = router