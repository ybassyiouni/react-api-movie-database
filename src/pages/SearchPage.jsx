import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function SearchPage() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("All")

  const navigate = useNavigate()

  // fetch when query changes
  useEffect(() => {
    if (query === "") return

    setLoading(true)
    setError("")

    fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results)
        } else {
          setCharacters([])
          setError("No characters found.")
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError("Something went wrong.")
        setLoading(false)
      })
  }, [query])

  function handleSearch() {
    setQuery(search)
  }

  function handleRandom() {
    const randomId = Math.floor(Math.random() * 826) + 1
    navigate(`/character/${randomId}`)
  }

  function getStatusColor(status) {
    if (status === "Alive") return "#39ff14"
    if (status === "Dead") return "red"
    return "gray"
  }

  const filteredCharacters = characters.filter(
    (c) => filter === "All" || c.status === filter
  )

  return (
    <div className="page">
      <h1>Rick and Morty Character Search</h1>

      <form className="search-bar" onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
        <input
          type="text"
          placeholder="Search a character..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" className="random-btn" onClick={handleRandom}>Random</button>
      </form>

      {characters.length > 0 && (
        <div className="filter-bar">
          <label>Filter by status: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {filteredCharacters.length > 0 && (
        <ul className="character-list">
          {filteredCharacters.map((character) => (
            <li
              key={character.id}
              className="character-item"
              onClick={() => navigate(`/character/${character.id}`)}
            >
              <img src={character.image} alt={character.name} />
              <div className="character-info">
                <strong>{character.name}</strong>
                <span>{character.species}</span>
                <span>
                  <span
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor(character.status) }}
                  ></span>
                  {character.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchPage
