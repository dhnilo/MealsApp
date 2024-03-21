import { createContext, useState } from "react";

export const FavoriteContext = createContext({
  ids: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

function FavoriteContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMeals] = useState([]);

  function addFavorite(mealId) {
    setFavoriteMeals((current) => [...current, mealId]);
  }

  function removeFavorite(mealId) {
    setFavoriteMeals((current) => current.filter((id) => id !== mealId));
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContextProvider;
