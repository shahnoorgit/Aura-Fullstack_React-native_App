import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import Custombtn from "../../components/Custombtn";
import { Link } from "expo-router";

const SignUp = () => {
  const [isSubmiting, setSubmiting] = useState(false);
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submit = () => {};
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
            Register to Auro
          </Text>
          <FormField
            title={"Username"}
            value={formdata.username}
            onChange={(e) => setFormData({ ...formdata, username: e })}
            otherStyles="mt-10"
          />
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
          <Custombtn
            title={"Sign up"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmiting}
          />
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link
              className=" text-lg font-psemibold text-secondary"
              href={"/sign-in"}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
