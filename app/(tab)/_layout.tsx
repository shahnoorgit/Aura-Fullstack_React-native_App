import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const TabRoot = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => {
            return (
              <View className=" shadow-lg shadow-black w-24 mb-20 justify-center items-center flex h-24 rounded-full bg-gray-600">
                <AntDesign name="contacts" size={40} color={"white"} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabRoot;
