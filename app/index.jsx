import { Link } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
  return (
    <View className=" flex-1 justify-center items-center ">
      <Text className="text-3xl font-pblack">Aura!</Text>
      <Link to={"/home"}>
        <Text className=" text-blue-500">Go To Home</Text>
      </Link>
    </View>
  );
};

export default index;
