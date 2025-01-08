import React from "react";

export default function MovieSearchDetails({ movie, onSelectMovie }) {
  const { Title, Year, Poster, imdbID, imdbRating } = movie;

  return (
    <div
      className="grid grid-cols-[6rem_1fr] grid-rows-[auto_auto] gap-x-6 p-4 border-b border-gray-700 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg"
      onClick={() => onSelectMovie(imdbID)}
    >
      <img
        src={Poster}
        alt={`${Title} poster`}
        className="w-full h-32 object-cover row-span-2 rounded"
      />
      <h3 className="text-xl font-bold text-white">{Title}</h3>
      <div className="flex items-center gap-6">
        <p className="text-gray-400">{Year}</p>
        {imdbRating && (
          <p className="text-yellow-500 flex items-center gap-2">
            <span className="material-icons">star</span>
            {imdbRating}
          </p>
        )}
      </div>
    </div>
  );
}
