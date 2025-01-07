import React from "react";
import Box from "./Box";
import Movie from "./Movie";

export default function FeaturedMovie({ movie, onSelectMovie }) {
  if (!movie) return null;

  const { Poster, Title, Year, imdbRating } = movie;

  return (
    <Box
      className="relative h-full w-full bg-cover bg-center rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${Poster})` }}
    >
      <Movie
        movie={movie}
        onSelectMovie={onSelectMovie}
        className="relative  z-10 p-6 text-white bg-transparent w-full mb-4"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
    </Box>
  );
}
