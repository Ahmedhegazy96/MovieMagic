import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function MovieDetailsContent({ movie }) {
  const {
    Title: title,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Poster: poster,
  } = movie;

  return (
    <>
      <header className="flex items-center mb-8">
        <img
          src={poster}
          alt={`${title} poster`}
          className="w-1/3 rounded-lg shadow-lg"
        />
        <div className="ml-8">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg">{year}</p>
          <p className="text-gray-400 text-lg">{runtime}</p>
          <p className="text-gray-400 text-lg">{released}</p>
          <p className="text-gray-400 text-lg">{actors}</p>
        </div>
      </header>
      <section className="flex flex-col gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
          <p className="text-gray-400">{plot}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Rating</h3>
          <p className="text-yellow-500 flex items-center gap-2">
            <span className="material-icons">star</span>
            {imdbRating}
          </p>
        </div>
      </section>
    </>
  );
}
