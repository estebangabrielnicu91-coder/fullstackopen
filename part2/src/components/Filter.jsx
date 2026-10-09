const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Buscar: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter