import React from "react";

export default function MovieSearchDetails({ movie }) {
  const { Title, Year, Poster, imdbRating } = movie;

  return (
    <div className="grid grid-cols-[6rem_1fr] grid-rows-[auto_auto] gap-x-6 p-4 border-b border-gray-700 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg">
      <img
        src={Poster}
        alt={`${Title} poster`}
        className="w-full h-32 object-cover row-span-2 rounded"
      />
      <h3 className="text-xl font-bold text-white">{Title}</h3>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400">Year: {Year}</p>
        {imdbRating && (
          <p className="flex items-center mt-1">
            <span className="mr-2">⭐</span>
            <span>{movie.imdbRating}</span>
          </p>
        )}
      </div>
    </div>
  );
}
