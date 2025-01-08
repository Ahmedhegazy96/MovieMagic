import Box from "./Box";
import MovieDetails from "./MovieDetails";

import { useKey } from "../hooks/useKey";

export default function SelectedMovieDetails({ onCloseMovie }) {
  useKey("Escape", onCloseMovie);
  return (
    <Box>
      <MovieDetails onCloseMovie={onCloseMovie} />
    </Box>
  );
}
