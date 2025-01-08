import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import Box from "./Box";
import Spinner from "./Spinner";
import MovieSearchDetails from "./MovieSearchDetails.jsx";
import FavoritesButton from "./FavoritesButton.jsx";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <Box className="w-full max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <ul className="space-y-6 bg-gray-800 p-4 rounded-xl shadow-lg">
        {movies?.map((movie) => (
          <li
            key={movie.imdbID}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-800"
            onClick={() => onSelectMovie(movie.imdbID)}
          >
            <MovieSearchDetails movie={movie} onSelectMovie={onSelectMovie} />
            <FavoritesButton selectedId={movie.imdbID} />
          </li>
        ))}
      </ul>
    </Box>
  );
}
