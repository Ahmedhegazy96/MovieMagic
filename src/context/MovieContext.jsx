import React, { createContext, useEffect, useReducer } from "react";

const MovieContext = createContext();

const initialState = {
  query: "",
  movies: [],
  selectedId: null,
  selectedMovie: "",
  trendingMovies: [],

  isLoading: false,
  error: null,
  favorites: [],
};
const getFavoritesFromStorage = () => {
  const favoritesFromStorage = localStorage.getItem("favorites");
  let parsedFavorites = [];
  try {
    parsedFavorites = favoritesFromStorage
      ? JSON.parse(favoritesFromStorage)
      : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage.", error);
  }
  return parsedFavorites;
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_TRENDING_MOVIES":
      return { ...state, trendingMovies: action.payload };
    case "SET_SELECTED_ID":
      return { ...state, selectedId: action.payload };
    case "SET_SELECTED_MOVIE":
      return { ...state, selectedMovie: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "ADD_FAVORITE":
      if (!state.favorites.find((fav) => fav.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "CLEAR_FAVORITES":
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
};

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, {
    ...initialState,
    favorites: getFavoritesFromStorage(),
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
