import React, { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons.js'
import './App.css'

const Filter = (props) => {
  return (
    <form>
      <p>Filter shown with :</p>
      <input value={props.search} onChange={props.onChange}></input>
    </form>
  )
}

const Notification = (props) => {
  setTimeout(() => {
    props.setMessage("")
    props.setError("")
  }, 5000)


  if (props.message !== "") {
    return (
      <div>
        <div className='message'>{props.message}</div>
      </div>
    )
  }
  else if (props.error != "") {
    return (
      <div>
        <div className='error'>{props.error}</div>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }

}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {

  return (
    <div>
      {props.personToShow.map(person =>
        <p key={person.id}>{person.name} : {person.number} <button type="submit" onClick={() => {
          if (window.confirm("Delete " + person.name + "?")) {
            personService.drop(person.id)
              .then(response => response.data)
              .then(id =>
                
                props.setMessage(`${person.name} is deleted with success`),
                props.setPersons(props.persons.filter(p => p.id !== person.id))
              )
              .catch(error => {
                props.setError("An error has been occurred during Deleting " + person.name + " ! Please retry ")
              })
          }
        }}>delete</button></p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  let personToShow = (search === "") ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) === true)
  
  const addPerson = (event) => {
    event.preventDefault()
    let ensure = 0
    if (newName === "" || newNumber === "") { ensure = -4 }
    persons.map(person => { if (person.number === newNumber && ensure === 0) { ensure = -1 } })
    persons.map(person => { if (person.name.toLowerCase() === newName.toLowerCase() && ensure === 0) { ensure = 1 } })
    if (ensure === 0) {

      let personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(response => setPersons(persons.concat(response.data),setMessage(`${personObject.name} is added with success`),setNewName(''),
        setNewNumber('')))
        // .then(returnedPerson =>
        //   setNewName(''),
        //   setNewNumber(''),
        // )
        .catch(error => {
          setError("An error has been occurred during Adding " + newName + " ! Please respect the sizes (name>5 and number=10) ")
        })
        
        // setPersons(persons.concat(personObject)),
          // setMessage(`${personObject.name} is added with success`),
    }
    else if (ensure === -4) {
      const message = "The name or number is missing"
      window.alert(message);
    }

    else if (ensure === -1) {
      const message = newNumber + " is already added to phonebook"
      window.alert(message);
    }
    else if (ensure > 0) {
      const message_toConfirm = newName + " is already added to phonebook, do u wanna replace the old number with a new one?"
      if (window.confirm(message_toConfirm)) {
        const myPerson = persons.filter(person => { if (person.name === newName) { return person } })
        const newPerson = {
          name: newName,
          number: newNumber,
          id: myPerson[0].id
        }
        personService.update(myPerson[0].id, newPerson)

          .then(response => response.data)
          .then(
            setPersons(persons.map(person => person.id !== myPerson[0].id ? person : newPerson)),
            setMessage("Updated " + newName),
          )
          .catch(error => {
            setError("An error has been occurred during Updating " + newName + " ! Please retry ")
          })
        setNewName("")
        setNewNumber("")
      }
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {

    setSearch(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} error={error} setMessage={(e) => setMessage(e)} setError={(e) => setError(e)} />
      <Filter search={search} onChange={(e) => { handleSearchChange(e) }} />
      <h3>Add a new</h3>

      <PersonForm onSubmit={(e) => { addPerson(e) }} newName={newName} newNumber={newNumber}
        handleNameChange={(e) => { handleNameChange(e) }} handleNumberChange={(e) => { handleNumberChange(e) }}
      />


      <h2>Numbers</h2>
      <Persons setMessage={(e) => setMessage(e)} personToShow={personToShow} persons={persons} setPersons={(e) => setPersons(e)} setError={(e) => setError(e)}/>

    </div>
  )
}

export default App