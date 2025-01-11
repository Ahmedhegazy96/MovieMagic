import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import Logo from "./Logo";
import Button from "./Button";

export default function NavBar({ onToggleComponent }) {
  const { state, dispatch } = useContext(MovieContext);
  const { query } = state;
  const [inputValue, setInputValue] = useState(query);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_APP_KEY
          }&s=new&type=movie&y=2024`
        );
        const data = await response.json();
        dispatch({ type: "SET_TRENDING_MOVIES", payload: data.Search });
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

  useEffect(
    function () {
      if (!query) return;

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          dispatch({ type: "SET_ERROR", payload: null });
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${
              import.meta.env.VITE_APP_KEY
            }&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("something went wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          dispatch({ type: "SET_MOVIES", payload: data.Search });

          dispatch({ type: "SET_ERROR", payload: null });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            dispatch({ type: "SET_ERROR", payload: err.message });
          }
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "SET_QUERY", payload: "" });
        }
      }

      if (query.length < 3) {
        dispatch({ type: "SET_LOADING", payload: true });

        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, dispatch]
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "") return;
    dispatch({ type: "SET_QUERY", payload: inputValue });
    dispatch({ type: "SET_MOVIES", payload: [] });
    setInputValue("");

    navigate("/search");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg  top-0 z-50 rounded-b-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Logo />
        <div className="flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="p-2 rounded bg-gray-700 text-white w-full md:w-auto"
            placeholder="Search for movies..."
            id="input-search"
          />
          <button
            onClick={handleSearch}
            className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition w-full md:w-auto"
          >
            Search
          </button>

          <Button
            onClick={() => onToggleComponent("trending")}
            className="text-white text-lg"
          >
            Trending Now!
          </Button>

          <Button
            onClick={() => onToggleComponent("favorites")}
            className="text-white text-lg"
          >
            Favorites
          </Button>
        </div>
      </div>
    </nav>
  );
}
