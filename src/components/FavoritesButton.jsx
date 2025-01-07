import React, { useState, useEffect } from "react";

export default function FavoritesButton({ selectedId, className }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(selectedId));
  }, [selectedId]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(selectedId)) {
      const updatedFavorites = favorites.filter((id) => id !== selectedId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      console.log(`Removed ${selectedId} from favorites`);
    } else {
      favorites.push(selectedId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      console.log(`Added ${selectedId} to favorites`);
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
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </button>
  );
}
