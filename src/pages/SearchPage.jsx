import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function SearchPage() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  // fetch characters whenever the query changes
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

  return (
    <div className="page">
      <h1>Rick and Morty Character Search</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search a character..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="character-list">
        {characters.map((character) => (
          <li
            key={character.id}
            className="character-item"
            onClick={() => navigate(`/character/${character.id}`)}
          >
            <img src={character.image} alt={character.name} />
            <div className="character-info">
              <strong>{character.name}</strong>
              <span>{character.species}</span>
              <span>{character.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchPage
