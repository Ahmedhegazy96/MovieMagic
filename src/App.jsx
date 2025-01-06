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
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  // const [showSearch, setShowSearch] = useState(false);

  useEffect(
    function () {
      if (!query) return;

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("something went wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    console.log(selectedId);

    setShowDetails(true);
  }
  function handleCloseMovie() {
    setSelectedId(null);
    setShowDetails(false);
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
      {query ? (
        <Main>
          <Box className="">
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          </Box>
          {showDetails && selectedId && (
            <Box>
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
              />
            </Box>
          )}
        </Main>
      ) : (
        <Main>
          <Box>
            <SlickSlider movies={movies} onSelectMovie={handleSelectMovie} />
          </Box>
          {showDetails && selectedId && (
            <Box>
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
              />
            </Box>
          )}
        </Main>
      )}

      <Footer />
    </div>
  );
}

export default App;
