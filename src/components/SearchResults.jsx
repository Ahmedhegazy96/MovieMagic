import Box from "./Box";
import MovieList from "./MovieList";
import Trending from "./Trending";

export default function SearchResults({ movies, onSelectMovie }) {
  return (
    <Box>
      <MovieList movies={movies} onSelectMovie={onSelectMovie} />
      <Trending onSelectMovie={onSelectMovie} />
    </Box>
  );
}
