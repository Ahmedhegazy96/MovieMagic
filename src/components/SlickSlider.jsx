import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./SlickSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movie from "./Movie";
import Box from "./Box";

export default function SlickSlider({ onSelectMovie }) {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const currentMovie = movies[currentSlide] || {};

  return (
    <Box>
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <Movie movie={movie} onSelectMovie={onSelectMovie} key={index} />
          ))}
        </Slider>
      </div>
    </Box>
  );
}
