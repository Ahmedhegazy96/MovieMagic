import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function NavBar({ query, setQuery, children }) {
  return (
    <nav className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Logo />

        {children}

        <Link to="/" className="text-white text-lg">
          <Button>Trending Now!</Button>
        </Link>
      </div>
    </nav>
  );
}
