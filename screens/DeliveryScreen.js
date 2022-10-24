import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="text-white text-lg font-light">Order Help</Text>
        </View>
        <View className="bg-white rounded-lg mx-5 my-2 p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">EstimatedArrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              className="h-20 w-20"
              source={{
                uri: "https://links.papareact.com/fls",
              }}
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="text-gray-500 mt-3">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: 41.90855,
          longitude: -87.64636,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="z-0 flex-1 -mt-20"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: 41.90855, longitude: -87.64636 }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row h-34 items-center space-x-5">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">EMRE YAZICI</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] font-bold text-lg mr-5">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
