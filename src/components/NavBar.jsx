import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";

export default function NavBar({ onToggleComponent }) {
  const { state, dispatch } = useContext(MovieContext);
  const { query } = state;
  const [inputValue, setInputValue] = useState(query);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // const handleSearch = () => {
  // //   dispatch({ type: "SET_QUERY", payload: inputValue });
  // // };

  // function handleSearch(newQuery) {
  //   dispatch({
  //     type: "SET_QUERY",
  //     payload: query === newQuery ? "" : newQuery,
  //   });
  //   navigate("/search");
  // }
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
