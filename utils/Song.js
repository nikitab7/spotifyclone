import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import millisToMinutesAndSeconds from "./millisToMinutesAndSeconds";
import { Themes } from "../assets/Themes";
import DetailedSongScreen from "../app/DetailedSongScreen";
import PreviewScreen from "../app/PreviewScreen";

const Song = ({
  index,
  imageUrl,
  title,
  artists,
  albumName,
  duration,
  externalUrl,
  previewUrl,
}) => {
  const navigation = useNavigation();

  const handleSongPress = () => {
    // Navigate to the detailed song screen and pass parameters
    navigation.navigate("DetailedSongScreen", {
      title,
      externalUrl,
    });
  };
  const handlePlayPress = () => {
    // Navigate to the PreviewScreen and pass parameters
    navigation.navigate("PreviewScreen", {
      title,
      previewUrl,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSongPress}>
      {/* First Box: Index */}

      {/* First Box: Play Button */}
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={handlePlayPress}>
          <Ionicons
            name="play-circle"
            size={25}
            color={Themes.colors.spotify}
          />
        </TouchableOpacity>
      </View>
      {/* Second Box: Album Cover */}
      <View style={styles.albumImageContainer}>
        <Image style={styles.albumImage} source={{ uri: imageUrl }} />
      </View>

      {/* Third Box: Song Name and Artists */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artists} numberOfLines={1}>
          {artists.map((artist) => artist.name).join(", ")}
        </Text>
      </View>

      {/* Fourth Box: Album Name */}
      <View style={styles.albumNameContainer}>
        <Text style={styles.albumName} numberOfLines={1}>
          {albumName}
        </Text>
      </View>

      {/* Fifth Box: Duration */}
      <View style={styles.durationContainer}>
        <Text style={styles.duration}>
          {millisToMinutesAndSeconds(duration)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Song;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  indexContainer: {
    marginRight: 8,
    padding: 4,
  },
  index: {
    fontSize: 13,
    color: Themes.colors.gray,
  },
  albumImageContainer: {
    marginRight: 8,
  },
  albumImage: {
    width: 66,
    height: 66,
    borderRadius: 0,
  },
  detailsContainer: {
    flex: 2.5,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    color: Themes.colors.white,
  },
  artists: {
    fontSize: 14,
    color: Themes.colors.gray,
    marginBottom: 4,
  },
  albumNameContainer: {
    flex: 1.5,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  playButtonContainer: {
    marginRight: 16,
    marginLeft: 12,
  },
  albumName: {
    fontSize: 14,
    color: Themes.colors.white,
    marginBottom: 4,
  },
  durationContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
  },
  duration: {
    fontSize: 14,
    color: Themes.colors.white,
  },
});
