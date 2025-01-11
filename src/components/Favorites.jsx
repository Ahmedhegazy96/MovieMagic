import React, { useContext } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import { MovieContext } from "../context/MovieContext";
import ClearFavoritesBtn from "./ClearFavoritesBtn";

export default function Favorites({ onSelectMovie }) {
  const { state } = useContext(MovieContext);
  const { movies, favorites } = state;

  // const favoriteMovies = movies.filter(
  //   (movie) => favorites.map((f) => f.id).includes(movie.imdbID) // Ensure this matches the stored data structure
  // );

  return (
    <Box className="container mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl my-6">
      <h1 className="text-3xl font-bold text-white mb-6">Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p className="text-white">No favorite movies found.</p>
      ) : (
        <>
          <ClearFavoritesBtn />
          <MovieList onSelectMovie={onSelectMovie} isFavorites={true} />
        </>
      )}
    </Box>
  );
}
