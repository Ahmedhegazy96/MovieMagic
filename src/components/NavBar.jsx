import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";

export default function NavBar() {
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

    navigate("/search");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50 rounded-b-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Logo />
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Search for movies..."
          />
          <button
            onClick={handleSearch}
            className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Search
          </button>

          <Link to="/" className="text-white text-lg">
            <Button>Trending Now!</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
