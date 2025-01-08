import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function FavoritesButton({ className }) {
  const { state, dispatch } = useContext(MovieContext);
  const { favorites, selectedId } = state;

  const isFavorite = favorites.includes(selectedId);

  const handleToggleFavorite = () => {
    try {
      if (isFavorite) {
        dispatch({ type: "REMOVE_FAVORITE", payload: selectedId });
      } else {
        dispatch({ type: "ADD_FAVORITE", payload: selectedId });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update favorites." });
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition ${
        isFavorite
          ? "bg-pink-600 hover:bg-pink-700"
          : "bg-pink-300 hover:bg-pink-400"
      } text-white ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  );
}
