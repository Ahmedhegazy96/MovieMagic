import React, { useContext } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import { MovieContext } from "../context/MovieContext";

export default function Favorites({ onSelectMovie }) {
  const { state } = useContext(MovieContext);
  const { favorites, movies } = state;

  const favoriteMovies = movies.filter((movie) =>
    favorites.includes(movie.imdbID)
  );

  return (
    <Box className="container mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl my-6">
      <h1 className="text-3xl font-bold text-white mb-6">Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <p className="text-white">No favorite movies found.</p>
      ) : (
        <MovieList movies={favoriteMovies} onSelectMovie={onSelectMovie} />
      )}
    </Box>
  );
}
