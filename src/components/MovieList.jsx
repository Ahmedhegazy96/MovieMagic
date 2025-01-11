import React, { useContext, useEffect, useState } from "react";
import Movie from "./Movie";
import Box from "./Box";
import Spinner from "./Spinner";
import MovieSearchDetails from "./MovieSearchDetails.jsx";
import FavoritesButton from "./FavoritesButton.jsx";
import { MovieContext } from "../context/MovieContext.jsx";

export default function MovieList({ onSelectMovie, isFavorites = false }) {
  const { state, dispatch } = useContext(MovieContext);
  const {
    query,
    isLoading,
    error,
    movies,
    selectedId,
    favorites = Array.isArray(state.favorites) ? state.favorites : [],
  } = state;

  console.log(favorites);

  const displayedMovies = isFavorites ? favorites : movies;

  return (
    <Box className="w-full max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <ul className="space-y-6 bg-gray-800 p-4 rounded-xl shadow-lg">
        {displayedMovies.length > 0
          ? displayedMovies.map((movie) => (
              <li
                key={movie.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-800"
                onClick={() =>
                  onSelectMovie(isFavorites ? movie.id : movie.imdbID)
                }
              >
                <MovieSearchDetails
                  movie={movie}
                  onSelectMovie={onSelectMovie}
                />
                <FavoritesButton
                  selectedId={isFavorites ? movie.id : movie.imdbID}
                  movie={movie}
                />
              </li>
            ))
          : null}
      </ul>
    </Box>
  );
}
