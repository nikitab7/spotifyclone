import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const PreviewScreen = () => {
  const route = useRoute();
  const { title, previewUrl } = route.params;

  return (
    <SafeAreaView style={{ flex: 2 }}>
      <WebView source={{ uri: previewUrl }} />
    </SafeAreaView>
  );
};

export default PreviewScreen;
