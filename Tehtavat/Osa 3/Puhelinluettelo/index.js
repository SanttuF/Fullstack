require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contents'))
app.use(cors())
app.use(express.static('build'))

morgan.token("contents", (req, res) => JSON.stringify(req.body))

const Person = require('./models/person')

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if (per) {res.json(person)} 
        else {res.status(404).end()}
    })
})

app.post('/api/persons', (req, res) => {
    const per = req.body

    if (!per.name || !per.number) {
        return res.status(400).json({error: 'missing name or number'})
    }

    // if (persons.some(p => p.name === per.name)) {
    //     return res.status(400).json({error: 'name already exists'})
    // }

    const person = new Person({
        name: per.name,
        number: per.number,
    })

    person.save().then(sPerson => {
        res.json(sPerson)
    })
})

// app.delete('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     persons = persons.filter(p => p.id !== id)
//     res.status(204).end()
// })

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people <br/> ${Date()}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {console.log("server is running")})