import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function FavoritesButton({ className, selectedId, movie }) {
  const { state, dispatch } = useContext(MovieContext);
  const { favorites } = state;

  const isFavorite = favorites.some((favMovie) => favMovie.id === selectedId);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();

    try {
      const movieData = {
        id: selectedId || movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year,
        imdbRating: movie.imdbRating,
      };

      if (isFavorite) {
        const updatedFavorites = favorites.filter(
          (fav) => fav.id !== movieData.id
        );

        dispatch({ type: "REMOVE_FAVORITE", payload: movieData.id });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        dispatch({ type: "ADD_FAVORITE", payload: movieData });

        localStorage.setItem(
          "favorites",
          JSON.stringify([...favorites, movieData])
        );
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update favorites." });
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition z-30 md:w-10 md:h-10 ${
        isFavorite
          ? "bg-red-600 hover:bg-red-700"
          : "bg-gray-600 hover:bg-gray-700"
      } text-white text-2xl md:text-xl ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 md:w-5 md:h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
}
