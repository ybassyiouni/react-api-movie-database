import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")

  return (
    <div>
      <h1>Character Search</h1>

      <input
        type="text"
        placeholder="Search character..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button>Search</button>
    </div>
  )
}

export default App