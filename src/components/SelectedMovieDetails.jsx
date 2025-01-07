import React from "react";
import Box from "./Box";
import MovieDetails from "./MovieDetails";
import Trending from "./Trending";

export default function SelectedMovieDetails({
  selectedId,
  onCloseMovie,
  onSelectMovie,
}) {
  return (
    <Box>
      <MovieDetails selectedId={selectedId} onCloseMovie={onCloseMovie} />
      <Trending onSelectMovie={onSelectMovie} />
    </Box>
  );
}
