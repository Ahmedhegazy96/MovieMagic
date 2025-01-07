import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function NavBar({ query, setQuery }) {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50 rounded-b-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Logo />

        <SearchBar query={query} setQuery={setQuery} />
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-lg">
            <Button>Trending Now!</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
