import React from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import SlickSlider from "./SlickSlider";

export default function SearchResults({ movies, onSelectMovie }) {
  return (
    <Box>
      <MovieList movies={movies} onSelectMovie={onSelectMovie} />
      <SlickSlider onSelectMovie={onSelectMovie} />
    </Box>
  );
}
