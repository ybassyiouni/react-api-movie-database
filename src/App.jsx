import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import CharacterDetail from "./pages/CharacterDetail"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
