import { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import useScrollToTop from "./hooks/useScrollToTop";

import SearchResults from "./routes/SearchResults";
import Trending from "./components/Trending";
import Box from "./components/Box";
import SelectedMovieDetails from "./routes/SelectedMovie";
import { MovieContext } from "./context/MovieContext";
import Favorites from "./components/Favorites";
import LandingPage from "./components/LandingPage";
import NotFound from "./routes/NotFound";
import { useKey } from "./hooks/useKey";

const KEY = "cad125ee";
function App() {
  const { state, dispatch } = useContext(MovieContext);
  const { query, movies, favorites } = state;
  const [showComponent, setShowComponent] = useState(null);

  useScrollToTop();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowComponent(null); // Reset the displayed component on route change
  }, [location.pathname]);

  console.log(query);

  function handleSelectMovie(id) {
    dispatch({
      type: "SET_SELECTED_ID",
      payload: id,
    });
    navigate(`/movie/${id}`);
  }
  function handleCloseMovie() {
    dispatch({ type: "SET_SELECTED_ID", payload: null });
    navigate(-1);
  }
  const toggleComponent = (component) => {
    setShowComponent((prevComponent) =>
      prevComponent === component ? null : component
    );
  };
  useKey("Escape", handleCloseMovie);

  return (
    <Box className="bg-gray-900 min-h-screen flex flex-col">
      <NavBar onToggleComponent={toggleComponent} />
      {showComponent === "trending" && (
        <Trending onSelectMovie={handleSelectMovie} />
      )}

      {showComponent === "favorites" && (
        <Favorites onSelectMovie={handleSelectMovie} />
      )}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onSelectMovie={handleSelectMovie} />}
          />

          <Route
            path="/search"
            element={<SearchResults onSelectMovie={handleSelectMovie} />}
          />
          <Route
            path="/movie/:id"
            element={<SelectedMovieDetails onCloseMovie={handleCloseMovie} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Box>
  );
}

export default App;
