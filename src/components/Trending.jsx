import React, { useEffect, useState } from "react";
import Box from "./Box";
import SlickSlider from "./SlickSlider";
import TrendingMovie from "./TrendingMovie";
import Button from "./Button";

export default function Trending({ onSelectMovie }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getMovies() {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=cad125ee&s=new&type=movie&y=2024`
      );
      console.log(response);
      const data = await response.json();

      setMovies(data.Search);
    }
    getMovies();
  }, [setMovies]);

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
      <div id="slick-slider" className="mt-6">
        <SlickSlider
          currentSlide={currentSlide}
          movies={movies}
          onSelectMovie={onSelectMovie}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
    </Box>
  );
}
