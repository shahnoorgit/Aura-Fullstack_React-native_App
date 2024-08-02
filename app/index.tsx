import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
  return (
    <View className=" flex-1 justify-center items-center bg-gray-700">
      <Text className=" text-white font-bold">Hello world</Text>
      <Link href={"/about"}>About us</Link>
    </View>
  );
};

export default index;
