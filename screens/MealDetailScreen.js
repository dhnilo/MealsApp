import { useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/MealDetail/IconButton";
// import { FavoriteContext } from "../store/context/favorite-context";

function MealDetailScreen({ route, navigation }) {
  // const favMealsCtx = useContext(FavoriteContext);
  const favMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favMealIds.includes(mealId);

  function changeFavoriteStatus() {
    if (mealIsFavorite) {
      // favMealsCtx.removeFavorite(mealId);    // Context
      dispatch(removeFavorite({ id: mealId }));   // Redux
    } else {
      // favMealsCtx.addFavorite(mealId);   // Context
      dispatch(addFavorite({ id: mealId }));  // Redux
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatus}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatus]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.deatilText}
      />
      <View style={styles.listContainer}>
        <Subtitle>Ingredients</Subtitle>
        <List data={selectedMeal.ingredients} />
        <Subtitle>Steps</Subtitle>
        <List data={selectedMeal.steps} />
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  deatilText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
    alignSelf: "center",
  },
});
