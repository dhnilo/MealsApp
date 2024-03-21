import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
import { FavoriteContext } from '../store/context/favorite-context';
import { useSelector } from 'react-redux';

function FavoritesScreen({items}) {
  // const favMealsCtx = useContext(FavoriteContext);
  const favMealsIds = useSelector((state) => state.favoriteMeals.ids);

  const favoritedMeals = MEALS.filter((meal) => favMealsIds.includes(meal.id));

  // const favoritedMeals = MEALS.filter((meal) => favMealsCtx.ids.includes(meal.id));

  if (favoritedMeals.length === 0 || !favoritedMeals) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No favorite meals found. Start adding some!</Text>
      </View>
    );
  }

  return <MealsList items={favoritedMeals}/>;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});