const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contents'))
app.use(cors())
app.use(express.static('build'))

morgan.token("contents", (req, res) => JSON.stringify(req.body))

let persons = [
    {
        id:0,
        name:"abc",
        number:"123"
    },
    {
        id:1,
        name:"cde",
        number:"456"
    },
    {
        id:2,
        name:"fgh",
        number:"789"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const per = persons.find(p => p.id === id)

    if (per) {res.json(per)} 
    else {res.status(404).end()}
})

app.post('/api/persons', (req, res) => {
    const per = req.body

    if (!per.name || !per.number) {
        return res.status(400).json({error: 'missing name or number'})
    }

    if (persons.some(p => p.name === per.name)) {
        return res.status(400).json({error: 'name already exists'})
    }

    per.id = Math.floor(Math.random() * 9997 + 3)

    persons = persons.concat(per)
    res.json(per)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people <br/> ${Date()}</p>`)
})

app.listen(3001, () => {console.log("server is running")})