import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const DetailedSongScreen = () => {
  const route = useRoute();
  const { title, externalUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: externalUrl }} />
    </View>
  );
};

export default DetailedSongScreen;
