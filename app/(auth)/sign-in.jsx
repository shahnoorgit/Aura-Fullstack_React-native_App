import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomBtn from "../../components/Custombtn";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [isSubmiting, setSubmiting] = useState(false);
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const submit = async () => {
    if (!formdata.email || !formdata.password) {
      Alert.alert("Error", "All fields must be provided");
      return;
    }
    setSubmiting(true);
    try {
      await signIn(formdata.email, formdata.password);

      //setState
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold text-semibold mt-10">
            Log in to Auro
          </Text>
          <FormField
            title={"Email"}
            value={formdata.email}
            onChange={(e) => setFormData({ ...formdata, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <FormField
            title={"Password"}
            value={formdata.password}
            onChange={(e) => setFormData({ ...formdata, password: e })}
            otherStyles="mt-7"
          />
          <CustomBtn
            title={"sign in"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmiting}
          />
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg font-pregular text-gray-100">
              Don't have an account?
            </Text>
            <Link
              className=" text-lg font-psemibold text-secondary"
              href={"/sign-up"}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
