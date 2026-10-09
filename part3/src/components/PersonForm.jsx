const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Nombre: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Teléfono: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Añadir</button>
      </div>
    </form>
  )
}

export default PersonForm