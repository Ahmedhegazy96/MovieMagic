import React, { useContext, useEffect, useState } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import Box from "./Box";
import Spinner from "./Spinner";
import Button from "./Button";
import FavoritesButton from "./FavoritesButton";
import MovieDetailsContent from "./MovieDetailsContent";

import { MovieContext } from "../context/MovieContext";

const KEY = "cad125ee";

export default function MovieDetails({ onCloseMovie }) {
  const { state, dispatch } = useContext(MovieContext);
  const { selectedId, selectedMovie, isLoading, error } = state;

  useEffect(() => {
    if (!selectedId) return;

    const fetchMovieDetails = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const response = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`
        );
        const data = await response.json();

        if (data.Response === "False") {
          dispatch({ type: "SET_ERROR", payload: data.Error });
        } else {
          console.log(data);
          dispatch({ type: "SET_SELECTED_MOVIE", payload: data });
        }
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch movie details.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchMovieDetails();
  }, [selectedId, dispatch]);
  useEffect(() => {
    if (selectedMovie) {
      document.title = `Movie | ${selectedMovie.Title}`;
    }

    return () => {
      document.title = "MovieMagic";
    };
  }, [selectedMovie]);
  if (isLoading) return <Spinner />;
  if (!selectedMovie) return null;

  return (
    <Box className="p-8 bg-gray-900 rounded-2xl shadow-2xl">
      <MovieDetailsContent movie={selectedMovie} />
      <div className="absolute top-4 right-4 flex space-x-4">
        <FavoritesButton
          selectedId={selectedMovie.imdbID}
          movie={selectedMovie}
        />
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
