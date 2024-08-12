import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getVideos, getLatestVideos } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCrad from "../../components/VideoCrad";
import { useGlobalContext } from "../../context/Gloabalprovider";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getVideos);
  const { data: latestPosts } = useAppwrite(getLatestVideos);
  const onrefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  {
    /*const data = [
    { id: "1", title: "Video 1" },
    { id: "2", title: "Video 2" },
    { id: "3", title: "Video 3" },
    { id: "4", title: "Video 4" },
  ]*/
  }

  const data = []; // Replace with actual data

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        keyExtractor={(item) => item.$id}
        data={posts}
        renderItem={({ item }) => <VideoCrad video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subTitle={"Be the first to upload a video on Aura"}
            title={"No videos found"}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onrefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
