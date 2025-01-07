import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import useScrollToTop from "./hooks/useScrollToTop";

import SearchResults from "./components/SearchResults";
import Trending from "./components/Trending";
import Box from "./components/Box";
import SelectedMovieDetails from "./components/SelectedMovieDetails";

const KEY = "cad125ee";
function App() {
  useScrollToTop();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

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

    navigate("/");
  }

  function handleSearch(newQuery) {
    setQuery(query === newQuery ? "" : newQuery);
    navigate("/search");
  }

  return (
    <Box className="bg-gray-900 min-h-screen flex flex-col">
      <NavBar query={query} setQuery={handleSearch} />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<Trending onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="/search"
            element={
              <SearchResults
                movies={movies}
                onSelectMovie={handleSelectMovie}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <SelectedMovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onSelectMovie={handleSelectMovie}
              />
            }
          />
        </Routes>
        <Footer />
      </main>
    </Box>
  );
}

export default App;
