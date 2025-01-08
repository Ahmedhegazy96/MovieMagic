import React, { useContext, useEffect } from "react";
import Box from "./Box";
import MovieDetails from "./MovieDetails";
import Trending from "./Trending";
import { MovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import { useKey } from "../hooks/useKey";

export default function SelectedMovieDetails({ onCloseMovie }) {
  return (
    <Box>
      <MovieDetails onCloseMovie={onCloseMovie} />
    </Box>
  );
}
