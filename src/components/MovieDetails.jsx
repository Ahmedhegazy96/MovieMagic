import React, { useEffect, useState } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import Box from "./Box";
import Spinner from "./Spinner";
import Button from "./Button";
import FavoritesButton from "./FavoritesButton";
import MovieDetailsContent from "./MovieDetailsContent";

const KEY = "cad125ee";

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    Title: title,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Poster: poster,
  } = selectedMovie;
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
          setError(data.Error);
        } else {
          setSelectedMovie(data);
        }
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) {
      fetchMovie();
    }
  }, [selectedId]);

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "MovieMagic";
      };
    },
    [title]
  );

  if (isLoading) return <Spinner />;
  if (!selectedMovie) return null;
  if (error) return <Spinner />;

  return (
    <Box className="p-8 bg-gray-900 rounded-2xl shadow-2xl">
      <MovieDetailsContent movie={selectedMovie} />
      <div className="absolute top-4 right-4 flex space-x-4">
        <FavoritesButton selectedId={selectedId} />
        <Button
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition bg-gray-600 hover:bg-gray-700 text-white text-2xl"
          onClick={onCloseMovie}
        >
          &times;
        </Button>
      </div>
    </Box>
  );
}
