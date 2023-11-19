import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailedSongScreen from "./DetailedSongScreen";
import PreviewScreen from "./PreviewScreen";
import { Themes } from "../assets/Themes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailedSongScreen"
          component={DetailedSongScreen}
          options={{
            title: "Song details",
            headerStyle: {
              backgroundColor: Themes.colors.background,
            },
            headerTintColor: Themes.colors.white,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="PreviewScreen"
          component={PreviewScreen}
          options={{
            title: "Song preview",
            headerStyle: {
              backgroundColor: Themes.colors.background,
            },
            headerTintColor: Themes.colors.white,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
