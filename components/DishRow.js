import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  addToBasket,
} from "../features/basketSlice";
import BasketIcon from "./BasketIcon";

const DishRow = ({ id, title, description, image, price }) => {
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, title, image, price, description }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
        }}
        className="flex-row p-4 bg-white border border-gray-300"
      >
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{title}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400 mt-2 ">
            <Currency quantity={price} currency="GBP" />
          </Text>
          {isPressed && (
            <View className="flex-row items-center mt-3 space-x-2">
              <TouchableOpacity onPress={removeItemFromBasket}>
                <MinusCircleIcon
                  color={items.length ? "#00CCBB" : "gray"}
                  size={30}
                />
              </TouchableOpacity>
              <Text>{items.length}</Text>
              <TouchableOpacity onPress={addItemToBasket}>
                <PlusCircleIcon color="#00CCBB" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Image
            style={{
              borderWidth: 1,
              borderColor: "gray",
            }}
            className="h-20 w-20 bg-gray-300 p-4"
            source={{ uri: urlFor(image).url() }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DishRow;
