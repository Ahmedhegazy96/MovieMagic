import React from "react";
import Movie from "./Movie";
import Box from "./Box";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <Box className="w-full max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg">
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </Box>
  );
}
