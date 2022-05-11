import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const foods = [
  {
    title: "Lasagna",
    image: "https://www.okrecetas.com/recetas-de-pastas/img600/lasagna.jpg",
    description: "with butter, letuce, tomato and red sauce",
    price: "$13.50",
  },
  {
    title: "Hamburger",
    description: "with chedar, letuce, tomato and pickles",
    price: "$9.90",
    image:
      "https://assets.biggreenegg.eu/app/uploads/2019/03/28145521/topimage-classic-hamburger-2019m04-800x534.jpg",
  },
  {
    title: "Pasta",
    description: "with red sauce and cheese",
    price: "$12.90",
    image:
      "https://images.kitchenstories.io/wagtailOriginalImages/R2373-photo-final-2/R2373-photo-final-2-large-landscape-150.jpg",
  },
  {
    title: "Spring Salad",
    description:
      "with tomatos, cucumber, onion, cherry tomatos, cheese and avocado",
    price: "$7.80",
    image:
      "https://images.kitchenstories.io/wagtailOriginalImages/R2373-photo-final-2/R2373-photo-final-2-large-landscape-150.jpg",
  },
];

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
  priceStyle: {
    fontSize: 15,
    fontWeight: "600",
  }
});

export default function MenuItems({ restaurantName }) {
  const dispatch = useDispatch();

  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

    const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);

    const isFoodInCart = (food, cartItems) => 
        //finds will return an array with something
        Boolean(cartItems.find((item => item.title === food.title)));
    ;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            <BouncyCheckbox
              iconStyle={{
                borderColor: "lightgray",
              }}
              fillColor="#4cd487"
              isChecked={isFoodInCart(food, cartItems)} 
              onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              
            />
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text >{props.food.description}</Text>
    <Text style={styles.priceStyle}>{props.food.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{ width: 100, height: 100, borderRadius: 8 }}
    />
  </View>
);
