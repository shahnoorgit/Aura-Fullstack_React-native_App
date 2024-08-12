import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { Video, ResizeMode } from "expo-av";
import { UploadVideo } from "../../lib/appwrite";
import CustomBtn from "../../components/Custombtn";
import { icons } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "../../context/Gloabalprovider";
import { router } from "expo-router";
const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });

  const openPicker = async (fileType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        fileType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (fileType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (fileType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill all the fields");
    }

    setUploading(true);
    try {
      await UploadVideo({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Post Uploaded Successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        thumbnail: null,
        video: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className=" px-4 my-6">
        <Text className=" text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField
          title={"Video title"}
          value={form.title}
          otherStyles={"mt-10"}
          placeholder={"Give your video a catchy title"}
          onChange={(e) => setForm({ ...form, title: e })}
        />
        <View className=" mt-7 space-y-2">
          <Text className=" text-gray-100 text-base font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                className=" w-full h-64 rounded-2xl"
                source={{ uri: form.video.uri }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className=" w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className=" w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className=" mt-7 space-y-2">
          <Text className=" text-gray-100 text-base font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                className=" w-full h-64 rounded-2xl"
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
              />
            ) : (
              <View className=" w-full h-16 border-2 space-x-2 flex-row border-black-200 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className=" text-gray-100 font-pmedium text-sm">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title={"AI prompt"}
          value={form.prompt}
          otherStyles={"mt-7"}
          placeholder={"Prompt you used to create this video"}
          onChange={(e) => setForm({ ...form, prompt: e })}
        />
        <CustomBtn
          title={"Submit & Publish"}
          containerStyles={"mt-7"}
          isLoading={uploading}
          handlePress={submit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
