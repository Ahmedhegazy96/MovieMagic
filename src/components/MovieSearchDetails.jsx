import React from "react";
export default function MovieCardDetails({ movie, onSelectMovie }) {
  return (
    <div
      className="grid grid-cols-[6rem_1fr] grid-rows-[auto_auto] gap-x-6 p-4 border-b border-gray-700  cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg"
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-full h-32 object-cover row-span-2 rounded"
      />
      <h3 className="text-xl font-bold text-white">{movie.Title}</h3>
      <div className="flex items-center gap-6">
        <p className="text-gray-400">{movie.Year}</p>
        {movie.imdbRating && (
          <p className="text-yellow-500 flex items-center gap-2">
            <span className="material-icons">star</span>
            {movie.imdbRating}
          </p>
        )}
      </div>
    </div>
  );
}
