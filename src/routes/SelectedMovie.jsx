import Box from "../components/Box";
import MovieDetails from "../components/MovieDetails";

import { useKey } from "../hooks/useKey";

export default function SelectedMovieDetails({ onCloseMovie }) {
  useKey("Escape", onCloseMovie);
  return (
    <Box>
      <MovieDetails onCloseMovie={onCloseMovie} />
    </Box>
  );
}
