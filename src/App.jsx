import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Box from "./components/Box";
import Footer from "./components/Footer";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { useMovies } from "./hooks/useMovies";

import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import SlickSlider from "./components/SlickSlider";
import SearchResults from "./components/SearchResults";
import Trending from "./components/Trending";

const KEY = "cad125ee";
function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

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
  console.log(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    console.log(selectedId);
    navigate(`/movie/${id}`);
  }
  function handleCloseMovie() {
    setSelectedId(null);

    navigate(-1);
  }

  function handleSearch(newQuery) {
    setQuery(query === newQuery ? "" : newQuery);
    navigate("/search");
  }

  return (
    <div>
      <NavBar query={query} setQuery={handleSearch}>
        <SearchBar query={query} setQuery={handleSearch} />
      </NavBar>
      <Routes>
        <Route
          path="/"
          element={<Trending onSelectMovie={handleSelectMovie} />}
        />
        <Route
          path="/search"
          element={
            <SearchResults movies={movies} onSelectMovie={handleSelectMovie} />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
