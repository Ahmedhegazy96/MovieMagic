import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const ClearFavoritesBtn = () => {
  const { dispatch } = useContext(MovieContext);

  const handleClearFavorites = () => {
    // Clear local storage
    localStorage.removeItem("favorites");

    // Dispatch the clear favorites action
    dispatch({ type: "CLEAR_FAVORITES" });
  };

  return (
    <button onClick={handleClearFavorites} className="clear-favorites-button">
      Clear Favorites
    </button>
  );
};
export default ClearFavoritesBtn;
