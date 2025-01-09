import { useContext, useEffect, useState } from "react";
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

import SearchResults from "./routes/SearchResults";
import Trending from "./components/Trending";
import Box from "./components/Box";
import SelectedMovieDetails from "./routes/SelectedMovie";
import { MovieContext } from "./context/MovieContext";
import Favorites from "./components/Favorites";
import LandingPage from "./components/LandingPage";
import NotFound from "./routes/NotFound";
import { useKey } from "./hooks/useKey";

const KEY = "cad125ee";
function App() {
  const { state, dispatch } = useContext(MovieContext);
  const { query } = state;
  const [showComponent, setShowComponent] = useState(null);

  useScrollToTop();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function () {
      if (!query) return;

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          dispatch({ type: "SET_ERROR", payload: null });
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("something went wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          dispatch({ type: "SET_MOVIES", payload: data.Search });

          dispatch({ type: "SET_ERROR", payload: null });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            dispatch({ type: "SET_ERROR", payload: err.message });
          }
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "SET_QUERY", payload: "" });
        }
      }

      if (query.length < 3) {
        dispatch({ type: "SET_LOADING", payload: true });

        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, dispatch]
  );
  useEffect(() => {
    setShowComponent(null); // Reset the displayed component on route change
  }, [location.pathname]);

  console.log(query);

  function handleSelectMovie(id) {
    dispatch({
      type: "SET_SELECTED_ID",
      payload: id,
    });
    navigate(`/movie/${id}`);
  }
  function handleCloseMovie() {
    dispatch({ type: "SET_SELECTED_ID", payload: null });
    navigate(-1);
  }
  const toggleComponent = (component) => {
    setShowComponent((prevComponent) =>
      prevComponent === component ? null : component
    );
  };
  useKey("Escape", handleCloseMovie);

  return (
    <Box className="bg-gray-900 min-h-screen flex flex-col">
      <NavBar onToggleComponent={toggleComponent} />
      {showComponent === "trending" && (
        <Trending onSelectMovie={handleSelectMovie} />
      )}

      {showComponent === "favorites" && (
        <Favorites onSelectMovie={handleSelectMovie} />
      )}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onSelectMovie={handleSelectMovie} />}
          />

          <Route
            path="/search"
            element={<SearchResults onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="/movie/:id"
            element={<SelectedMovieDetails onCloseMovie={handleCloseMovie} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Box>
  );
}

export default App;
