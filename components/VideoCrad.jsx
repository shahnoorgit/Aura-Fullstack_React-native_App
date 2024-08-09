import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCrad = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className=" flex-col items-center px-4 mb-14">
      <View className=" flex-row gap-3 items-start">
        <View className=" justify-center items-center flex-row flex-1">
          <View className=" justify-center items-center p-0.5 border border-secondary w-[46px] h-[46px] rounded-lg">
            <Image
              source={{ uri: avatar }}
              className=" w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className=" justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className=" text-white text-sm font-psemibold "
            >
              {title}
            </Text>
            <Text className=" text-gray-100 text-sm font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            className=" w-5 h-5 "
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className=" w-full h-60 relative mt-3 rounded-xl justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className=" w-full h-full mt-3 rounded-lg"
            resizeMode="contain"
          />
          <Image
            source={icons.play}
            className=" h-12 w-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCrad;
