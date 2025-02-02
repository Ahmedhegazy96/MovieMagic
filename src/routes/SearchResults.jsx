import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";

import Box from "../components/Box";
import MovieList from "../components/MovieList";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import SearchPrompt from "../components/SearchPrompt";

export default function SearchResults({ onSelectMovie }) {
  const { state, dispatch } = useContext(MovieContext);
  const { query, movies, isLoading, error } = state;

  useEffect(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  useEffect(() => {
    if (!query) return;
    const fetchSearchResults = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_APP_KEY
          }&s=${query}`
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

  const handleRetry = () => {
    document.getElementById("input-search").focus();
    dispatch({ type: "SET_QUERY", payload: query });
  };

  return (
    <Box className="container mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl my-6">
      {isLoading && <Spinner />}
      {error && (
        <div className="text-center">
          <ErrorMessage message={"Movie not found. Try another one!"} />
          <Button onClick={handleRetry} className="mt-4">
            Retry
          </Button>
        </div>
      )}
      {!isLoading && !error && !query && <SearchPrompt />}
      {!isLoading && !error && query && movies.length === 0 && (
        <div className="text-center">
          <ErrorMessage message="No movies found. Try another search." />
        </div>
      )}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList onSelectMovie={onSelectMovie} />
      )}
    </Box>
  );
}
