import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  return (
    <View className=" w-full bg-black-100 h-16 border-2 space-x-4 flex-row border-black-200 px-4 rounded-xl items-center focus:border-secondary">
      <TextInput
        className="flex-1 text-white font-pregular mt-0.5 text-base"
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Please input something to search");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className=" w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
