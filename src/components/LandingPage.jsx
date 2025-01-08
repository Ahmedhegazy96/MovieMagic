import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const staticMovie = {
  Title: "Inception",
  Year: "2010",
  Runtime: "148 min",
  imdbRating: "8.8",
  Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  Released: "16 Jul 2010",
  Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  Poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
};

export default function LandingPage() {
  return (
    <div className="relative container mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl my-6">
      {staticMovie.Poster && (
        <div
          className="absolute inset-0 bg-cover bg-center rounded-xl opacity-50"
          style={{ backgroundImage: `url(${staticMovie.Poster})` }}
        ></div>
      )}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to MovieMagic
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Dive into the world of movies! Discover the latest trending films and
          explore your favorites.
        </p>
        <div className="mt-8 flex justify-center space-x-4 mb-8">
          <Link to="/search">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Search Movies
            </Button>
          </Link>
          <Link to="/favorites">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              View Favorites
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative z-0">
        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
        <div className="relative z-10 p-8">
          <h2 className="text-4xl font-bold text-white">{staticMovie.Title}</h2>
          <p className="text-gray-300 text-lg mb-2">
            Released: {staticMovie.Year}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            Duration: {staticMovie.Runtime}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            IMDb Rating: {staticMovie.imdbRating}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            Release Date: {staticMovie.Released}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            Actors: {staticMovie.Actors}
          </p>
          <p className="text-gray-300 text-lg">{staticMovie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
