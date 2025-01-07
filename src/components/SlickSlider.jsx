import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./SlickSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movie from "./Movie";
import Box from "./Box";

export default function SlickSlider({
  onSelectMovie,
  currentSlide,
  setCurrentSlide,
  movies,
}) {
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

  return (
    <div className="slick-slider-container bg-gray-800 p-6 rounded-lg shadow-lg">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <Movie
            movie={movie}
            onSelectMovie={onSelectMovie}
            key={index}
            className="p-2 h-full"
            showDetails={false}
          />
        ))}
      </Slider>
    </div>
  );
}
