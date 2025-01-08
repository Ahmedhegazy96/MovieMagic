import React, { useContext, useEffect, useState } from "react";
import Box from "./Box";
import SlickSlider from "./SlickSlider";
import TrendingMovie from "./TrendingMovie";
import Button from "./Button";
import { MovieContext } from "../context/MovieContext";
import Movie from "./Movie";
import Spinner from "./Spinner";

export default function Trending({ onSelectMovie }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { state, dispatch } = useContext(MovieContext);

  const { movies, isLoading, error } = state;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=cad125ee&s=new&type=movie&y=2024`
        );
        const data = await response.json();
        dispatch({ type: "SET_MOVIES", payload: data.Search });
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch trending movies.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchTrendingMovies();
  }, [dispatch]);

  const currentMovie = movies[currentSlide] || {};

  const handleScrollToSlider = () => {
    document
      .getElementById("slick-slider")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box className="container mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl my-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Trending Movies</h1>
        <Button
          onClick={handleScrollToSlider}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
        >
          &#x2193;
        </Button>
      </div>

      <TrendingMovie movie={currentMovie} onSelectMovie={onSelectMovie} />
      <SlickSlider
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        id="slick-slider"
      >
        {movies.map((movie) => (
          <Movie
            key={movie.imdbID}
            movie={movie}
            onSelectMovie={onSelectMovie}
            className="p-2 h-full"
            showDetails={false}
          />
        ))}
      </SlickSlider>
    </Box>
  );
}
