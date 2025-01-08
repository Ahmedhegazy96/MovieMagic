import { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import useScrollToTop from "./hooks/useScrollToTop";

import SearchResults from "./components/SearchResults";
import Trending from "./components/Trending";
import Box from "./components/Box";
import SelectedMovieDetails from "./components/SelectedMovieDetails";
import { MovieContext } from "./context/MovieContext.jsx";

const KEY = "cad125ee";
function App() {
  const { state, dispatch } = useContext(MovieContext);
  const { query } = state;

  useScrollToTop();

  const navigate = useNavigate();

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
            dispatch({ type: "SET_QUERY", payload: "" }); // Reset the query state
          }
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
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

  return (
    <Box className="bg-gray-900 min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/trending"
            element={<Trending onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="/search"
            element={<SearchResults onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="/movie/:id"
            element={<SelectedMovieDetails onCloseMovie={handleCloseMovie} />}
          />
        </Routes>
        <Trending onSelectMovie={handleSelectMovie} />
        <Footer />
      </main>
    </Box>
  );
}

export default App;
