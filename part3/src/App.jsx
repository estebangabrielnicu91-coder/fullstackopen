import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  // Cargar lista inicial
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Mostrar notificación temporal
  const showNotification = (message, errorState = false) => {
    setErrorMessage(message)
    setIsError(errorState)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // Guardar o actualizar contacto
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} ya existe en la agenda. ¿Quieres reemplazar el número antiguo por el nuevo?`
      )

      if (confirmUpdate) {
        const updatedObject = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Número de ${returnedPerson.name} actualizado correctamente.`)
          })
          .catch(error => {
            showNotification(
              `El contacto '${existingPerson.name}' ya fue eliminado del servidor.`,
              true
            )
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

    const newObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Añadido ${returnedPerson.name}`)
      })
  }

  // Eliminar contacto
  const handleDelete = (id, name) => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Eliminado ${name}`)
        })
        .catch(error => {
          showNotification(
            `El contacto '${name}' ya había sido eliminado del servidor.`,
            true
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Agenda Telefónica</h2>

      <Notification message={errorMessage} isError={isError} />

      <Filter filter={filter} handleFilterChange={(e) => setFilter(e.target.value)} />

      <h3>Añadir nuevo contacto</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Números</h3>

      <Persons personsToShow={personsToShow} deletePerson={handleDelete} />
    </div>
  )
}

export default App