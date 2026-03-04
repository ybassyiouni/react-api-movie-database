import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import CharacterDetail from "./pages/CharacterDetail"
import MatrixRain from "./components/MatrixRain"
import "./App.css"

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [characterResults, setCharacterResults] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("All")

  function handleClearSearch() {
    setSearchQuery("")
    setCharacterResults([])
    setSelectedFilter("All")
  }

  return (
    <BrowserRouter>
      <MatrixRain />
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              characterResults={characterResults}
              setCharacterResults={setCharacterResults}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              onClearSearch={handleClearSearch}
            />
          }
        />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
