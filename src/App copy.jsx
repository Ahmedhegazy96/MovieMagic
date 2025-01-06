import { useEffect, useState } from "react";
import "./App.css";
import Box from "./components/Box";
import Footer from "./components/Footer";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { useMovies } from "./hooks/useMovies";

import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import SlickSlider from "./components/SlickSlider";

const KEY = "cad125ee";
function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    console.log(selectedId);
    setShowDetails(true);
  }
  function handleCloseMovie() {
    setSelectedId(null);
    // setShowDetails(false);
  }
  // function handleSearch() {
  //   setQuery(query);
  //   setShowSearch(true);
  // }
  return (
    <div>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>

        <Box>
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
          />
        </Box>
      </Main>
      <SlickSlider />

      <Footer />
    </div>
  );
}

export default App;
