import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Logo />

      <SearchBar />

      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/trending">Trending</a>
        </li>
        <li>
          <FontAwesomeIcon icon={faBell} />
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
    </div>
  );
}
