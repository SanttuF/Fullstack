const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const pSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

pSchema.set('toJSON', {
    transform: (document, rObject) => {
        rObject.id = rObject._id.toString()
        delete rObject._id
        delete rObject.__v
    }
})

module.exports = mongoose.model("Person", pSchema)