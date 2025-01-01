import { useEffect, useState } from "react";
import SlickSlider from "./SlickSlider";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getMovies() {
      const response = await fetch(
        "https://www.omdbapi.com/?apikey=4075d940&s=new&type=movie&y=2024"
      );
      const data = await response.json();

      setMovies(data.Search);
    }
    getMovies();
  }, [setMovies]);
  return (
    <div>
      <SlickSlider movies={movies} />
    </div>
  );
}
