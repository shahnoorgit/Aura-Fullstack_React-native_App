import {
  View,
  Text,
  Image,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCrad from "../../components/VideoCrad";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, SearchPost, SignOut } from "../../lib/appwrite";
import { icons, images } from "../../constants";
import { useGlobalContext } from "@/context/Gloabalprovider";
import InfoCard from "../../components/InfoCard";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id));
  const logout = async () => {
    await SignOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        keyExtractor={(item) => item.$id}
        data={posts}
        renderItem={({ item }) => <VideoCrad video={item} />}
        ListHeaderComponent={() => (
          <View className=" justify-center items-center w-full mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className=" w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className=" w-6 h-6"
              />
            </TouchableOpacity>
            <View className=" w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className=" w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoCard
              title={user?.username}
              containerStyles=" mt-5"
              titleStyles=" text-lg"
            />
            <View className=" mt-5 flex-row">
              <InfoCard
                title={posts.length || 0}
                subTitle="Posts"
                containerStyles=" mr-10"
                titleStyles="text-xl"
              />

              <InfoCard
                title={"1.3K"}
                subTitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subTitle={"No videos found for this query"}
            title={"No videos found"}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
