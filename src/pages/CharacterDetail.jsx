import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

  // fetch the specific character by id
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!character) return <p>Character not found.</p>

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card">
        <img src={character.image} alt={character.name} />
        <div className="detail-info">
          <h1>{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Last known location: {character.location.name}</p>
          <p>Number of episodes: {character.episode.length}</p>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail
