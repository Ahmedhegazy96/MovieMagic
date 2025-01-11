import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Button from "./Button";

const ClearFavoritesBtn = () => {
  const { dispatch } = useContext(MovieContext);

  const handleClearFavorites = () => {
    localStorage.removeItem("favorites");

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
