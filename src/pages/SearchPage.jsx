import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function SearchPage({ searchQuery, setSearchQuery, characterResults, setCharacterResults, selectedFilter, setSelectedFilter, onClearSearch }) {
  const [searchInputValue, setSearchInputValue] = useState(searchQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (searchQuery === "") return

    setIsLoading(true)
    setErrorMessage("")

    fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacterResults(data.results)
        } else {
          setCharacterResults([])
          setErrorMessage("No characters found.")
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Something went wrong.")
        setIsLoading(false)
      })
  }, [searchQuery])

  function handleSearchButton() {
    setSearchQuery(searchInputValue)
  }

  function handleRandomCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1
    navigate(`/character/${randomId}`)
  }

  function getStatusDotColor(status) {
    if (status === "Alive") return "#39ff14"
    if (status === "Dead") return "red"
    return "gray"
  }

  const filteredCharacterList = characterResults.filter(
    (character) => selectedFilter === "All" || character.status === selectedFilter
  )

  return (
    <div className="page">
      <h1>Rick and Morty Character Search</h1>

      <form className="search-bar" onSubmit={(event) => { event.preventDefault(); handleSearchButton() }}>
        <input
          type="text"
          placeholder="Search a character..."
          value={searchInputValue}
          onChange={(event) => setSearchInputValue(event.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" className="random-btn" onClick={handleRandomCharacter}>Random</button>
      </form>

      {characterResults.length > 0 && (
        <div className="filter-bar">
          <label>Filter by status: </label>
          <select value={selectedFilter} onChange={(event) => setSelectedFilter(event.target.value)}>
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <button className="clear-btn" onClick={onClearSearch}>Clear</button>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {filteredCharacterList.length > 0 && (
        <ul className="character-list">
          {filteredCharacterList.map((character) => (
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
                    style={{ backgroundColor: getStatusDotColor(character.status) }}
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
