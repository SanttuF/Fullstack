const errorhandler = (error, request, response, next) => {
  if (error.message.includes('notNull Violation')) {
    return response.status(400).json({error: error.message})
  }
  if (error.message === 'Invalid attributes') {
    return response.status(400).json({error: 'Missing likes'})
  }
  if (error.message.includes('Cannot set properties of null')) {
    return response.status(404).json({error: 'Can not find specified index'})
  }
  if (error.message.includes('Username needs to be an email')) {
    return response.status(400).json({error: 'Username needs to be an email'}) 
  }
  if (error.message === 'Can only delete own blogs') {
    return response.status(403).json({error: error.message})
  }
  if (error.message === 'Can edit only own reading list') {
    return response.status(403).json({error: error.message})
  }

  return response.status(400).json({error: error.message})
}

module.exports = errorhandler