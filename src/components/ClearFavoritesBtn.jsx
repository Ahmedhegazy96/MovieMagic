import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Button from "./Button";

const ClearFavoritesBtn = () => {
  const { dispatch } = useContext(MovieContext);

  const handleClearFavorites = () => {
    // Clear local storage
    localStorage.removeItem("favorites");

    // Dispatch the clear favorites action
    dispatch({ type: "CLEAR_FAVORITES" });
  };

  return (
    <Button
      onClick={handleClearFavorites}
      className="clear-favorites-button align-end"
    >
      Clear Favorites
    </Button>
  );
};
export default ClearFavoritesBtn;
