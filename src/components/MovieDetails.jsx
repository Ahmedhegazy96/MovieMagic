import React, { useEffect, useState } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import Box from "./Box";

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
        if (data.Response === "True") {
          setSelectedMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (error) {
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

  if (!selectedMovie) return null;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${selectedMovie}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDB rating
                </p>
              </div>
            </header>
            <section>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </Box>
  );
}
