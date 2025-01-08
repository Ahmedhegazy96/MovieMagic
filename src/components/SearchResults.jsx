import { useContext, useEffect } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import Trending from "./Trending";
import { MovieContext } from "../context/MovieContext";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function SearchResults({ onSelectMovie }) {
  const { state, dispatch } = useContext(MovieContext);
  const { query, movies, isLoading, error } = state;

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=cad125ee&s=${query}`
        );
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        dispatch({ type: "SET_MOVIES", payload: data.Search });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch search results.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchSearchResults();
  }, [query, dispatch]);
  // useEffect(() => {
  //   // Simulate a loading delay
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Box>
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={"Please try another movie."} />}
      <MovieList movies={movies} onSelectMovie={onSelectMovie} />
    </Box>
  );
}
