require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny'), morgan(':body'))
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }
  next(error)
}

app.use(errorHandler)
const Person = require('./models/Person')


app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})


app.get('/', (request, response) => {
  const date = new Date()
  response.send('<h3>Phonebook has info for ' + length + ' people <br> ' + date + '</h3>')
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndRemove(request.params.id)
    .then(
      response.status(200).json(request.params.id)
    )
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const name = request.body.name
  const number = request.body.number
  if (request.body.name === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (name === null || number === null || number === '' || name === '') {
    return response.json({
      error: 'The name or number is missing'
    })
  } else {
    Person.find({
      name: name
    }).then(persons => {
      if (persons.length === 0) {
        const person = new Person({
          name: name,
          number: number,
        })
        person.save()
          .then(response => response.data)
          .then(() => response.status(200).json(person)
          )
          .catch(error => next(error))
      } else {
        return response.status(400).json({
          error: 'Name must be unique'
        })
      }
    })
  }
})



app.put('/api/persons/:id', (request, response, next) => {
  const name = request.body.name
  const number = request.body.number
  const id = request.params.id

  const person = new Person({
    name: name,
    number: number,
    _id: id
  })

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true
  })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('Server running on port 3001')
})