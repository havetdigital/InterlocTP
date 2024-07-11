import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  LoginScreen,
  Dashboard,
  DetailsMission,
  ValidateMission,
  HorairesScreen,
  ForgotPasswordScreen,
  RegisterScreen,
  GetPassword,
  SignatureScreen,
  LitigeScreen,
  UpdatePasswordScreen,
  CameraScreen,
  GalleryImages,
} from "./screens";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="DetailsMission" component={DetailsMission} />
        <Stack.Screen name="ValidateMission" component={ValidateMission} />
        <Stack.Screen name="HorairesScreen" component={HorairesScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="GetPassword" component={GetPassword} />
        <Stack.Screen name="SignatureScreen" component={SignatureScreen} />
        <Stack.Screen name="LitigeScreen" component={LitigeScreen} />
        <Stack.Screen
          name="UpdatePasswordScreen"
          component={UpdatePasswordScreen}
        />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="GalleryImages" component={GalleryImages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
//ywendzinski@hhotmail.com
