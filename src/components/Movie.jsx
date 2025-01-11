import Box from "./Box";
import MovieCardDetails from "./MovieSearchDetails.jsx";

export default function Movie({
  movie,
  onSelectMovie,
  className,
  showDetails = true,
}) {
  console.log(movie.imdbID);
  return (
    <Box
      className={`cursor-pointer bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 ${className}`}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <div>
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          className={`w-full ${
            showDetails ? "object-cover" : "object-fit"
          } h-64`}
        />
        {showDetails && (
          <div className="p-4">
            <h3 className="text-xl font-bold text-white">{movie.Title}</h3>
            <div className="mt-2 text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">🗓</span>
                <span>{movie.Year}</span>
              </p>
              {movie.imdbRating && (
                <p className="flex items-center mt-1">
                  <span className="mr-2">⭐</span>
                  <span>{movie.imdbRating}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
