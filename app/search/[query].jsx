import { View, Text, Image, RefreshControl, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCrad from "../../components/VideoCrad";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { SearchPost } from "../../lib/appwrite";
import { images } from "../../constants";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(() => SearchPost(query));
  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        keyExtractor={(item) => item.$id}
        data={posts}
        renderItem={({ item }) => <VideoCrad video={item} />}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results for
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className=" mt-6 mb-8">
              <SearchInput initialQuery={query} />
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

export default Search;
